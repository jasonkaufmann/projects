using System.Collections;
using System.Linq;
using UnityEngine;
using UnityEngine.UI;
using System.Collections.Generic;
using System.Numerics;
using UnityEngine.SceneManagement;
using Vector2 = UnityEngine.Vector2;
using Vector3 = UnityEngine.Vector3;

public class Snake : MonoBehaviour {
    public Material newMaterialRef;
    public Camera cam;
    public GameObject scoreTextObj;

    private direction currentDir;
    private state currentState;
    private GameObject food;
    private float incrementDistance;

    public List<GameObject> piecesOfSnake = new List<GameObject>();
    private int score;
    public GameObject head;
    private float delayTime = 0.15f;
    private Vector2 topRightPosition;

    // Start is called before the first frame update
    private void Start() {
        piecesOfSnake.Add(head);
        currentState = state.RUNNING;
        currentDir = direction.RIGHT;
        topRightPosition = cam.ScreenToWorldPoint(new Vector2(Screen.width, Screen.height));
        incrementDistance = transform.localScale.x;
        SpawnFood();
    }

    // Update is called once per frame
    private void Update() {
        if (Input.GetKey("up") && currentDir != direction.DOWN)
            currentDir = direction.UP;
        else if (Input.GetKey("down") && currentDir != direction.UP)
            currentDir = direction.DOWN;
        else if (Input.GetKey("left") && currentDir != direction.RIGHT)
            currentDir = direction.LEFT;
        else if (Input.GetKey("right") && currentDir != direction.LEFT)
            currentDir = direction.RIGHT;

        if (currentState == state.RUNNING) {
            
            for(int i = piecesOfSnake.Count-1; i>0; i--)
                piecesOfSnake[i].transform.position = piecesOfSnake[i - 1].transform.position;
            
            if (currentDir == direction.RIGHT || currentDir == direction.LEFT)
                transform.position += new Vector3(incrementDistance * (currentDir == direction.RIGHT ? 1 : -1), 0, 0);
            else
                transform.position += new Vector3(0, incrementDistance * (currentDir == direction.UP ? 1 : -1), 0);

            bool collision = detectCollision();
            if (collision) {
                PlayerPrefs.SetInt("score", score);
                PlayerPrefs.Save();
                SceneManager.LoadScene("EndScreen");
            }
            currentState = state.WAITING;
            if (transform.position.x == food.transform.position.x &&
                transform.position.y == food.transform.position.y) {
                score++;
                delayTime *= 0.97f;
                Text scoreText = scoreTextObj.GetComponent<Text>();
                scoreText.text = score.ToString();
                GameObject newSegment = GameObject.CreatePrimitive(PrimitiveType.Cube);
                newSegment.transform.localScale = new Vector3(0.5f, 0.5f, 0);
                if (piecesOfSnake.Count == 1)
                    newSegment.transform.position = head.transform.position + new Vector3(incrementDistance * (currentDir == direction.RIGHT ? -1 :
                        (currentDir == direction.LEFT ? 1 :0)),incrementDistance * (currentDir == direction.UP ? -1 :
                        (currentDir == direction.DOWN ? 1 :0)), 0);
                else if (piecesOfSnake[score - 1].transform.position.x > piecesOfSnake[score - 2].transform.position.x)
                    newSegment.transform.position = piecesOfSnake[score - 1].transform.position + new Vector3(incrementDistance, 0, 0 );
                else if (piecesOfSnake[score - 1].transform.position.x < piecesOfSnake[score - 2].transform.position.x)
                    newSegment.transform.position = piecesOfSnake[score - 1].transform.position + new Vector3(-incrementDistance, 0, 0 );
                else if (piecesOfSnake[score - 1].transform.position.y < piecesOfSnake[score - 2].transform.position.y)
                    newSegment.transform.position = piecesOfSnake[score - 1].transform.position + new Vector3(0, -incrementDistance, 0);
                else
                    newSegment.transform.position = piecesOfSnake[score - 1].transform.position + new Vector3(0, incrementDistance, 0);
                piecesOfSnake.Add(newSegment);
                Destroy(food);
                SpawnFood();
            }

            StartCoroutine(MyCoroutine());
        }
        else if (currentState == state.WAITING) {
            // do nothing;
        }
    }

    private bool detectCollision() {
        for(int i = piecesOfSnake.Count-1; i>0; i--)
            if (head.transform.position == piecesOfSnake[i].transform.position) 
                return true;
        if (transform.position.x > topRightPosition.x) 
            return true;
        if (transform.position.x < -topRightPosition.x) 
            return true;
        if (transform.position.y > topRightPosition.y) 
            return true;
        if (transform.position.y < -topRightPosition.y) 
            return true;
        return false;
    }
    private void SpawnFood() {
        Vector2 positions = new Vector2(
            (int) Random.Range(-topRightPosition.x / incrementDistance, topRightPosition.x / incrementDistance),
            (int) Random.Range(-topRightPosition.y / incrementDistance, topRightPosition.y / incrementDistance)
        );
        var xPos = positions.x * incrementDistance;
        var yPos = positions.y * incrementDistance;

        food = GameObject.CreatePrimitive(PrimitiveType.Sphere);
        food.transform.position = new Vector3(xPos, yPos, 0);
        food.transform.localScale = new Vector3(0.3f, 0.3f, 0);
        //Get the Renderer component from the new cube
        Renderer sphereRenderer = food.GetComponent<Renderer>();

        //Call SetColor using the shader property name "_Color" and setting the color to red
        sphereRenderer.material.color = new Color(1, 0, 0);
    }

    private IEnumerator MyCoroutine() { ; // get faster everyTime
        yield return new WaitForSeconds(delayTime); //Wa
        currentState = state.RUNNING;
    }

    private enum state {
        WAITING,
        RUNNING
    }

    private enum direction {
        UP,
        DOWN,
        LEFT,
        RIGHT
    }
}