using UnityEngine;

public class KnobController : MonoBehaviour {
    private bool _dragged;
    private int speed = 7;

    // Start is called before the first frame update
    private void Start() {
    }

    // Update is called once per frame
    private void Update() {
        if (_dragged) {
            Vector3 mousePos = Camera.main.ScreenToWorldPoint(Input.mousePosition);
            transform.position = new Vector3(transform.position.x, mousePos.y, 0);
        }

        if (Input.GetKey(KeyCode.UpArrow)) {
            transform.position += new Vector3(0, speed * Time.deltaTime, 0);
        } else if (Input.GetKey(KeyCode.DownArrow)) {
            transform.position -= new Vector3(0, speed * Time.deltaTime, 0);
        }

        if (Input.GetMouseButtonUp(0)) _dragged = false;
    }

    private void OnMouseOver() {
        if (Input.GetMouseButtonDown(0)) _dragged = true;
    }
}