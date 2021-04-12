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

import coverflow from 'coverflow';


let formatter = require('d3-format');
let d3 = Object.assign(
  formatter,
  require('d3-fetch'),
  require('d3-time-format')
);

if (!isEmbedded) {
  d3.json('https://d3sl9l9bcxfb5q.cloudfront.net/json/mw-coverflow').then(
    (data) => {
		let h2 = document.querySelectorAll('h2');
		let sport
        let sportIndex
        [].forEach.call(h2, function (el) {
            sport = el.innerText
        });
        	    
      data.forEach(function (d, i) {
	    if (d.sport == sport){
		    sportIndex = i;
		    let previous = (i - 1 > -1) ? i - 1 : data.length - 1
		    let next = (i + 1 < data.length) ? i + 1 : 0;
			let headerElm = document.querySelectorAll('#sport-list');
			[].forEach.call(headerElm, function (el) {
	            el.insertAdjacentHTML('afterend', `<div id="button-holder" class="d-flex"><a class="previous page-btn" href="${data[previous].url}">← PREVIOUS | <span>${data[previous].sport}</span></a><a class="home page-btn" href="${data[0].homepage}">HOME</a><a class="next page-btn" href="${data[next].url}"><span>${data[next].sport}</span> | NEXT →</a></div>`)
	        });
		};
	    
        document.getElementById(
          'coverflow'
        ).innerHTML += `<img id="${i}" src="https://graphics.thomsonreuters.com/data/olympics2021/images/${d.id}.png" />`;
        let modClass = i % 2 == 0 ? 'stripe' : '';
        let selected = i == sportIndex ? 'selected' : '';
        document.getElementById(
          'sport-list'
        ).innerHTML += `<div data-id="${i}" class="flip-sport ${modClass} ${selected}">${d.sport} </div>`;
      });

      document.getElementById('sport-name').innerHTML = data[sportIndex].sport;

      setTimeout(function () {
        function updateSelectedCover(index) {
          document.getElementById('sport-name').innerHTML = data[index].sport;
          var elems = document.querySelectorAll('.flip-sport.selected');

          [].forEach.call(elems, function (el) {
            el.classList.remove('selected');
          });
          var selectElems = document.querySelectorAll(`[data-id="${index}"]`);

          [].forEach.call(selectElems, function (el) {
            el.classList.add('selected');
          });
        }

        var sportImgs = document.querySelectorAll('#coverflow img');
        [].forEach.call(sportImgs, function (el) {
          el.addEventListener('click', (event) => {
            let index = event.target.getAttribute('id');
            updateSelectedCover(index);
          });
        });

        coverflow.initialize('coverflow', {
          maxHeight: 200,
          timeConstant: 200,
          onActiveClick: function (index) {
            window.open(data[index].url, '_self');
          },
          onChange: function (index) {
            updateSelectedCover(index);
          },
        });

        coverflow.setActive(sportIndex);

        let sportList = document.getElementById('sport-list');
        sportList.addEventListener('mouseover', function (event) {
          let index = event.target.getAttribute('data-id');
          if (coverflow.getActiveIndex() == index) {
            return;
          }
          var elems = document.querySelectorAll('.flip-sport.selected');

          [].forEach.call(elems, function (el) {
            el.classList.remove('selected');
          });
          coverflow.flowTo(index);
          setTimeout(function () {
            coverflow.setActive(index);
          }, 200);

          document.getElementById('sport-name').innerHTML = data[index].sport;
        });

        sportList.addEventListener('click', function (event) {
          let index = event.target.getAttribute('data-id');
          window.open(data[index].url, '_self');
        });
      }, 1000);
    }
  );
	
	
	
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


