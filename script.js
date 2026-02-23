let currentTab = 'all';

window.onload = function () {
  console.log("Welcome! Your Job Tracker is ready.");
  updateCounts();
};

function updateCounts() {
  const allCards = document.querySelectorAll('.job-card');
  const interviewCount = document.querySelectorAll('.job-card[data-status="interview"]').length;
  const rejectedCount = document.querySelectorAll('.job-card[data-status="rejected"]').length;

  document.getElementById('totalCount').innerText = allCards.length;
  document.getElementById('interviewCount').innerText = interviewCount;
  document.getElementById('rejectedCount').innerText = rejectedCount;

  let visibleCount = 0;
  allCards.forEach(card => { if (window.getComputedStyle(card).display !== 'none') visibleCount++; });
  document.getElementById('badgeCount').innerText = `${visibleCount} jobs`;

  console.log("Update: Total=" + allCards.length + ", Interview=" + interviewCount + ", Rejected=" + rejectedCount);

  const noData = document.getElementById('no-data');
  const list = document.getElementById('jobList');
  if (visibleCount === 0) {
    noData.classList.remove('hidden');
    list.classList.add('hidden');
  } else {
    noData.classList.add('hidden');
    list.classList.remove('hidden');
  }
}

function newTab(tab) {
  currentTab = tab;
  console.log("Current Tab: " + tab.toUpperCase());

  document.querySelectorAll('button[id^="tab-"]').forEach(btn => btn.classList.remove('active-tab'));
  document.getElementById(`tab-${tab}`).classList.add('active-tab');

  document.querySelectorAll('.job-card').forEach(card => {
    const status = card.getAttribute('data-status');
    card.style.display = (tab === 'all' || status === tab) ? 'block' : 'none';
  });
  updateCounts();
}

function changeStatus(id, newStatus) {
  const card = document.getElementById(id);
  const oldStatus = card.getAttribute('data-status');

  const finalStatus = (oldStatus === newStatus) ? 'none' : newStatus;

  if (finalStatus !== 'none') {
    console.log("Clicked: " + finalStatus.toUpperCase());
  } else {
    console.log("Reset Status: " + id);
  }

  card.setAttribute('data-status', finalStatus);
  const label = card.querySelector('.status-badge');
  label.innerText = finalStatus === 'none' ? 'NOT APPLIED' : finalStatus.toUpperCase();

  card.querySelector('.btn-int').classList.toggle('active-green', finalStatus === 'interview');
  card.querySelector('.btn-rej').classList.toggle('active-red', finalStatus === 'rejected');

  card.classList.remove('border-interview', 'border-rejected');
  if (finalStatus === 'interview') {
    card.classList.add('border-interview');
  } else if (finalStatus === 'rejected') {
    card.classList.add('border-rejected');
  }

  newTab(currentTab);
}

// Delete function
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