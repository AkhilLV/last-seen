const logListDiv = document.getElementById("list");
const btn = document.getElementById("btn");

const friendsList = JSON.parse(localStorage.getItem("friends")) || [];
const tomSelectOptions = friendsList.map((friend) => {
  return {
    id: friend.name,
    label: friend.name,
  };
});

new TomSelect("#select", {
  create: true,
  sortField: {
    field: "text",
    direction: "asc",
  },

  valueField: "label",
  labelField: "label",
  searchField: "label",

  options: tomSelectOptions,
});

btn.addEventListener("click", () => {
  const selectedFriendName = document.getElementById("select").value;

  if (!selectedFriendName) {
    return;
  }

  const friendsList = JSON.parse(localStorage.getItem("friends")) || [];

  const existingFriendId = friendsList.findIndex(
    (currFriend) => currFriend.name === selectedFriendName
  );

  if (existingFriendId !== -1) {
    friendsList[existingFriendId].lastSeen = new Date();
  } else {
    friendsList.push({ name: selectedFriendName, lastSeen: new Date() });
  }

  localStorage.setItem("friends", JSON.stringify(friendsList));

  renderList();
});

const prettyPrintDate = (date) => {
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  const now = new Date();
  const diffMs = date - now;

  // Work with absolute value and direction (past/future)
  const diffInSeconds = Math.round(diffMs / 1000);
  const diffInMinutes = Math.round(diffInSeconds / 60);
  const diffInHours = Math.round(diffInMinutes / 60);
  const diffInDays = Math.round(diffInHours / 24);
  const diffInWeeks = Math.round(diffInDays / 7);
  const diffInMonths = Math.round(diffInDays / 30);

  if (Math.abs(diffInMinutes) < 60) {
    return rtf.format(diffInMinutes, "minute");
  } else if (Math.abs(diffInHours) < 24) {
    return rtf.format(diffInHours, "hour");
  } else if (Math.abs(diffInDays) < 7) {
    return rtf.format(diffInDays, "day");
  } else if (Math.abs(diffInWeeks) < 4) {
    return rtf.format(diffInWeeks, "week");
  } else {
    return rtf.format(diffInMonths, "month");
  }
};

const renderList = () => {
  const friendsList = JSON.parse(localStorage.getItem("friends")) || [];

  if (friendsList.length === 0) {
    logListDiv.innerText = "You ain't got no friends? Call some!";
    return;
  }

  logListDiv.innerHTML = "";
  friendsList.forEach((friend) => {
    logListDiv.insertAdjacentHTML(
      "beforeend",
      `<p>${friend.name} ... ${prettyPrintDate(new Date(friend.lastSeen))}</p>`
    );
  });
};

renderList();
