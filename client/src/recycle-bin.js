let selectArray = [
  {
    label: "banana",
    value: 0
  },
  {
    label: "applesauce",
    value: 1
  },
  {
    label: "baby carrots",
    value: 4
  }
];

let stateItems = ["bananas"];

let stateItems = this.state.stateItems;
let selectArray = selected;

selectArray.forEach(selection => {
  if (!stateChecker(stateItems, selection)) {
    stateItems.push(selection.label);
  }
});

function stateChecker(stateItems, selection) {
  for (let i = 0; i < stateItems.length; i++) {
    if (stateItems[i] === selection.label) {
      return true;
    }
  }
  return false;
}
