using UnityEngine;

public class AI : MonoBehaviour {
    public Camera cam;
    public GameObject ball;

    //movement speed in units per second
    private readonly float movementSpeed = 7f;

    private Vector3 topRight;

    // Start is called before the first frame update
    private void Start() {
        topRight = cam.ScreenToWorldPoint(new Vector3(Screen.width, Screen.height, 0));
    }

    // Update is called once per frame
    private void Update() {
        var ballY = ball.transform.position.y;
        int verticalInput = 0;
        if (ballY > transform.position.y + transform.localScale.y/2)
            verticalInput = 1;
        else if (ballY < transform.position.y - transform.localScale.y/2)
            verticalInput = -1;
        transform.position = transform.position + new Vector3(0, verticalInput * movementSpeed * Time.deltaTime, 0);
        if (transform.position.y + transform.localScale.y / 2 > topRight.y)
            transform.position = new Vector3(transform.position.x, topRight.y - transform.localScale.y / 2, 0);
        else if (transform.position.y - transform.localScale.y / 2 < -topRight.y)
            transform.position = new Vector3(transform.position.x, -topRight.y + transform.localScale.y / 2, 0);
    }
}