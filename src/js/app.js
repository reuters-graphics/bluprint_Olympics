import '../scss/main.scss';

// IF we're in an iframe...
const isEmbedded = window.location !== window.parent.location;
// You can write code specific to embeds like this...
if (isEmbedded) {
  try {
    window.childFrame.sendHeight();
  } catch (err) {
    console.log('pym not found.');
  }
}

import { t } from 'ttag';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import 'waypoints/lib/noframework.waypoints.js';


if (!isEmbedded) {
	let scrollItems = document.querySelectorAll('.scroll-item')
	scrollItems.forEach((scrollItem)=>{
		new Waypoint({
			element: scrollItem,
			handler: function(direction) {
				let elements = document.querySelectorAll('.opener-img.second')
		        if (direction == 'down') {
					elements.forEach((element)=>{
						element.classList.add("selected")
					})
		        } else {
					elements.forEach((element)=>{
						element.classList.remove("selected")
					})
		        }
		    },
		    offset: '90%',
		})
	
	})
	
	let stickyItems = document.querySelectorAll('.scroll-container')
	stickyItems.forEach((stickyItem)=>{
		new Waypoint({
			element: stickyItem,
			handler: function(direction) {
		        if (direction == 'down') {
					this.element.classList.add("un-fixed")
		        } else {
					this.element.classList.remove("un-fixed")
		        }
		    },
		    offset: 'bottom-in-view',
		})
	})
}

tippy(document.querySelectorAll('[data-tippy-content]'),{allowHTML:true});



document.getElementById("sked-instructions").addEventListener("click", ()=>{
	let element = document.getElementById("slide-down");
	element.classList.toggle("selected");	
})


