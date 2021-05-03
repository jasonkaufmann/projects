using System;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

public class ValueUpdater : MonoBehaviour {
    public void UpdateText() {
        GetComponent<TMP_Text>().text = Math.Round(transform.parent.GetComponent<Slider>().value, 4).ToString();
    }
}