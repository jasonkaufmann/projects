using System.Collections.Generic;
using TMPro;
using UnityEngine;

public class GraphController : MonoBehaviour {
    public LineRenderer graphLine;
    public GameObject targetPosition;
    public List<Vector2> drawPoints;
    public GameObject p;
    public GameObject i;
    public GameObject d;
    public double currentValue;
    public int numPoints = 1000;
    public double incrementX;
    private readonly float resolution = 1;
    private readonly double widthInWorldUnits = 16.0f;
    private double cumError;
    private bool firstFrame = true;
    private Vector3 initalPos;
    private double lastError;

    // Start is called before the first frame update
    private void Start() {
        currentValue = 0;
        graphLine = gameObject.AddComponent<LineRenderer>();
        graphLine.startWidth = 0.01f;
        graphLine.endWidth = 0.01f;
        graphLine.widthMultiplier = 4;
        graphLine.material = new Material(Shader.Find("Sprites/Default"));
        graphLine.material.color = new Color(82f / 255f, 81f / 255f, 81f / 255f, 1f);
        initalPos = targetPosition.transform.position;
        drawPoints = new List<Vector2>();
        drawPoints.Add(new Vector2(initalPos.x, (float) currentValue));
        incrementX = widthInWorldUnits / numPoints;
        print(incrementX);
    }

    // Update is called once per frame
    private void Update() {
        double target = targetPosition.transform.position.y;
        var p = double.Parse(this.p.GetComponent<TMP_Text>().text);
        var i = double.Parse(this.i.GetComponent<TMP_Text>().text);
        var d = double.Parse(this.d.GetComponent<TMP_Text>().text);

        var error = target - drawPoints[0].y;
        cumError += error * Time.deltaTime;
        if (firstFrame) {
            lastError = error;
            firstFrame = false;
        }

        var rateError = (error - lastError) / Time.deltaTime;
        var force = p * error + i * cumError + d * rateError;
        print(d);
        lastError = error;

        for (var k = 0; k < drawPoints.Count; k++)
            drawPoints[k] = new Vector2((float) (drawPoints[k].x - incrementX), drawPoints[k].y);

        drawPoints.Insert(0, new Vector2(initalPos.x,
            (float) (drawPoints[0].y + force)));


        if (drawPoints.Count > 1000) drawPoints.RemoveAt(drawPoints.Count - 1);

        graphLine.positionCount = 0;
        var count = 0;
        for (var j = 0; j < drawPoints.Count; j++)
            for (var l = 0; l < resolution; l++)
                if (j != drawPoints.Count - 1) {
                    graphLine.positionCount++;
                    Vector2 interpolatedPoint = Lerp(drawPoints[j], drawPoints[j + 1], l / resolution);
                    graphLine.SetPosition(count, new Vector3(interpolatedPoint.x, interpolatedPoint.y, 0));
                    count++;
                }
    }

    private Vector2 Lerp(Vector2 start, Vector2 end, float t) {
        return start + (end - start) * t;
    }
}