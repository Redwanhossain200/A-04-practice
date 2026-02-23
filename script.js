let currentTab = 'all';

window.onload = function () {
  console.log("Welcome! Your Job Tracker is ready.");
  updateCounts();
};

function updateCounts() {

  const cards = document.querySelectorAll('.job-card');

  let total = cards.length;
  let interview = 0;
  let rejected = 0;
  let visible = 0;

  cards.forEach(function (card) {

    const status = card.getAttribute('data-status');
    if (status === 'interview') interview++;
    if (status === 'rejected') rejected++;
    if (card.style.display !== 'none') visible++;
  });

  document.getElementById('totalCount').innerText = total;
  document.getElementById('interviewCount').innerText = interview;
  document.getElementById('rejectedCount').innerText = rejected;
  document.getElementById('badgeCount').innerText = visible + " jobs";

  const noData = document.getElementById('no-data');
  const list = document.getElementById('jobList');

  if (visible === 0) {
    noData.classList.remove('hidden');
    list.classList.add('hidden');
  } else {
    noData.classList.add('hidden');
    list.classList.remove('hidden');
  }
  console.log("Update: Total=" + total + ", Interview=" + interview + ", Rejected=" + rejected);
}

function newTab(tab) {

  currentTab = tab;
  console.log("Current Tab: " + tab.toUpperCase());

  document.getElementById('tab-all').classList.remove('active-tab');
  document.getElementById('tab-interview').classList.remove('active-tab');
  document.getElementById('tab-rejected').classList.remove('active-tab');
  document.getElementById('tab-' + tab).classList.add('active-tab');


  const cards = document.querySelectorAll('.job-card');

  cards.forEach(function (card) {

    const status = card.getAttribute('data-status');

    if (tab === 'all') {
      card.style.display = 'block';
    }
    else if (status === tab) {
      card.style.display = 'block';
    }
    else {
      card.style.display = 'none';
    }
  });

  updateCounts();
}

function changeStatus(id, newStatus) {

  const card = document.getElementById(id);
  const oldStatus = card.getAttribute('data-status');

  let finalStatus;
  if (oldStatus === newStatus) {
    finalStatus = 'none';
  } else {
    finalStatus = newStatus;
  }

  if (finalStatus !== 'none') {
    console.log("Clicked: " + finalStatus.toUpperCase());
  } else {
    console.log("Reset Status: " + id);
  }

  card.setAttribute('data-status', finalStatus);

  const label = card.querySelector('.status-badge');
  if (finalStatus === 'none') {
    label.innerText = 'NOT APPLIED';
  } else if (finalStatus === 'interview') {
    label.innerText = 'INTERVIEW';
  } else if (finalStatus === 'rejected') {
    label.innerText = 'REJECTED';
  }

  const interviewBtn = card.querySelector('.btn-int');
  const rejectedBtn = card.querySelector('.btn-rej');

  interviewBtn.classList.remove('active-green');
  rejectedBtn.classList.remove('active-red');

  if (finalStatus === 'interview') {
    interviewBtn.classList.add('active-green');
  }
  if (finalStatus === 'rejected') {
    rejectedBtn.classList.add('active-red');
  }

  card.classList.remove('border-interview');
  card.classList.remove('border-rejected');

  if (finalStatus === 'interview') {
    card.classList.add('border-interview');
  }
  if (finalStatus === 'rejected') {
    card.classList.add('border-rejected');
  }

  newTab(currentTab);
}


function removeJob(id) {
  const confirmDelete = confirm("Delete this application?");

  if (confirmDelete) {
    const card = document.getElementById(id);
    console.log("Delete: " + id);

    card.classList.add('delete-btn');
    setTimeout(() => {
      card.remove();
      updateCounts();
      console.log(id + " has permanently removed.");
    }, 300);
  } else {
    console.log("Cancelled by user.");
  }
}