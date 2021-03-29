using System.Collections;
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.UI;

public class Ball : MonoBehaviour {
    public Camera cam;

    public GameObject leftScoreObj;

    public GameObject rightScoreObj;
    private readonly int maxScore = 5;
    private Vector2 _direction;

    private state currentState;

    private int leftScore;
    private Text leftText;

    private int rightScore;

    private Text rightText;
    private int speed = 7;
    private Vector2 topRight;

    // Start is called before the first frame update
    private void Start() {
        currentState = state.WAITING;
        StartCoroutine(MyCoroutine());
        int startAngle = Random.Range(-45, 45);
        _direction = new Vector2(Mathf.Cos(startAngle * Mathf.Deg2Rad),Mathf.Sin(startAngle * Mathf.Deg2Rad));
        _direction = _direction * (Random.Range(0, 2) * 2 - 1);
        topRight = cam.ScreenToWorldPoint(new Vector2(Screen.width, Screen.height));
        print(_direction);
    }

    // Update is called once per frame
    private void Update() {
        if (currentState == state.PLAYING) {
            transform.position += new Vector3((_direction * speed * Time.deltaTime).x,
                (_direction * speed * Time.deltaTime).y, 0);
            if (transform.position.y + transform.localScale.y / 2 > topRight.y) {
                _direction = new Vector2(_direction.x, -_direction.y);
            }
            else if (transform.position.y - transform.localScale.y / 2 < -topRight.y) {
                _direction = new Vector2(_direction.x, -_direction.y);
            }
            else if (transform.position.x - transform.localScale.x / 2 > topRight.x) {
                currentState = state.RESET;
                leftScore++;
                leftText = leftScoreObj.GetComponent<Text>();
                leftText.text = leftScore.ToString();
            }
            else if (transform.position.x + transform.localScale.x / 2 < -topRight.x) {
                currentState = state.RESET;
                rightScore++;
                rightText = rightScoreObj.GetComponent<Text>();
                rightText.text = rightScore.ToString();
            }
        }
        else if (currentState == state.RESET) {
            transform.position = Vector3.zero;
            int startAngle = Random.Range(-45, 45);
            _direction = new Vector2(Mathf.Cos(startAngle * Mathf.Deg2Rad),Mathf.Sin(startAngle * Mathf.Deg2Rad));
            _direction = _direction * (Random.Range(0, 2) * 2 - 1);
            speed = 7;
            print("reset");
            currentState = state.WAITING;
            if (leftScore >= maxScore || rightScore >= maxScore)
                currentState = state.END;
            else
                StartCoroutine(MyCoroutine());
        }
        else if (currentState == state.END) {
            var winner = leftScore > rightScore;
            if (winner)
                PlayerPrefs.SetString("wt", "You Win!");
            else
                PlayerPrefs.SetString("wt", "You Lose!");
            PlayerPrefs.Save();
            SceneManager.LoadScene("EndScreen");
        }
        else if (currentState == state.WAITING) {
            //do nothing
        }
    }

    private void OnTriggerEnter(Collider other) {
        int startAngle = Random.Range(-45, 45);
        _direction = new Vector2(-_direction.x, Mathf.Sin(startAngle * Mathf.Deg2Rad));
        speed = Random.Range(12, 18);
    }

    private IEnumerator MyCoroutine() {
        yield return new WaitForSeconds(2); //Wait two seconds
        currentState = state.PLAYING;
    }

    private enum state {
        PLAYING,
        RESET,
        WAITING,
        END
    }
}