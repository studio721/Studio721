var buttons = document.querySelectorAll(".choice button"),
  tally = {
    1: 0,
    2: 0,
    total: 0
  };

function vote(choice) {
  tally[choice]++;
  tally["total"]++;
  console.log(tally);
  document.getElementById("tally1").innerHTML = tally[1];
  document.getElementById("tally2").innerHTML = tally[2];
  document.getElementById("percentage1").innerHTML = Math.round(tally[1] / tally["total"] * 100) + "%";
  document.getElementById("percentage2").innerHTML = Math.round(tally[2] / tally["total"] * 100) + "%";
}

function barPercentage(node, tally) {
  var choice = node.dataset.choice;
  
  if (tally[choice])
    return tally[choice]/tally["total"] * 100;
  return 0;
}

function renderBars() {
  var bars = document.getElementsByClassName("bar");
  
  for (var i = 0; i < bars.length; i++) {
    var percentage = barPercentage(bars[i], tally);
    console.log(percentage)
    bars[i].style.height = percentage.toString() + "%";

  }
}

function setup() {
  // Set up event listeners
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function(e) {
      vote(e.target.dataset["choice"]);
      renderBars();
    });
  }
  
  renderBars();
}

setup();