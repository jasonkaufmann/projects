using UnityEngine;

public class Player : MonoBehaviour {
    public Camera cam;

    //movement speed in units per second
    private readonly float movementSpeed = 10f;
    private Vector3 topRight;

    private void Start() {
        topRight = cam.ScreenToWorldPoint(new Vector3(Screen.width, Screen.height, 0));
        print("TopRight: " + topRight);
    }

    // Update is called once per frame
    private void Update() {
        //get the Input from Vertical axis
        var verticalInput = Input.GetAxis("Vertical");

        //update the position
        transform.position = transform.position + new Vector3(0, verticalInput * movementSpeed * Time.deltaTime, 0);
        if (transform.position.y + transform.localScale.y / 2 > topRight.y)
            transform.position = new Vector3(transform.position.x, topRight.y - transform.localScale.y / 2, 0);
        else if (transform.position.y - transform.localScale.y / 2 < -topRight.y)
            transform.position = new Vector3(transform.position.x, -topRight.y + transform.localScale.y / 2, 0);
    }
}