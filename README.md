Questions & Answers  

1.What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

Ans: Actually, getElementById is the most common one we use to find a specific element using its unique ID.getElementsByClassName gives us a list of HTMLCollection of all elements that have the same class name.On the other hand, querySelector is like a amazing selector because it can find elements using any CSS selector(like .class, #id).If we want to grab all elements that match, we use querySelectorAll.


2.How do you create and insert a new element into the DOM?

Ans: To add a new element firstly I use document.createElement('tagName') to create the tag in memory.Then I can add some text inside.innerText or add some styling using .classList.add().Finally,to show it on the website I attached it to an existing element using appendChild().


3.What is Event Bubbling? And how does it work?

Ans: Event Bubbling is a way how events move into DOM.When you click an element like a button that is inside a div, the click event first triggers on the button, then it "bubbles up" to its parent div, and then to the body, and finally to the root.It like a bubble rising from the bottom of the water to the top.


4.What is Event Delegation in JavaScript? Why is it useful?

Ans: Event Delegation is a smart technique where instead of adding event listeners to every single child element, we just add one listener to their parent.Because of 'Event Bubbling' the parent can catch the events from its children.It is super useful because it saves memory and if we add new items dynamically (like adding a new job card), we don't need to add new listeners for them.


5.What is the difference between preventDefault() and stopPropagation() methods?

Ans: These two are different. preventDefault() stops the default action that the browser usually does (like stopping a link from opening a new page or stopping a form from refreshing). But stopPropagation() stops the event from bubbling up to its parents. So, one stops the browser's behavior, and the other stops the event from traveling further up the DOM tree.