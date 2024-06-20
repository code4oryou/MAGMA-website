function loco() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
  });


  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();

}

loco()


var clutter = "";

document.querySelector("#page2>h1").textContent.split("").forEach(function (dets) {
  clutter += `<span>${dets}</span>`

  document.querySelector("#page2>h1").innerHTML = clutter;
})


gsap.to("#page2>h1>span", {
  scrollTrigger: {
    trigger: `#page2>h1>span`,
    start: `top bottom`,
    end: `bottom top`,
    scroller: `#main`,
    scrub: .5,
    // markers: true
  },
  stagger: .2,
  color: `#fff`
})


function canvas() {
  const canvas = document.querySelector("#page3>canvas");
  const context = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;


  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();
  });

  function files(index) {
    var data = `

 `;
    return data.split("\n")[index];
  }

  const frameCount = 67;

  const images = [];
  const imageSeq = {
    frame: 1,
  };

  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = files(i);
    images.push(img);
  }

  gsap.to(imageSeq, {
    frame: frameCount - 1,
    snap: "frame",
    ease: `none`,
    scrollTrigger: {
      scrub: .5,
      trigger: `#page3`,
      start: `top top`,
      end: `250% top`,
      scroller: `#main`,
    },
    onUpdate: render,
  });

  images[1].onload = render;

  function render() {
    scaleImage(images[imageSeq.frame], context);
  }

  function scaleImage(img, ctx) {
    var canvas = ctx.canvas;
    var hRatio = canvas.width / img.width;
    var vRatio = canvas.height / img.height;
    var ratio = Math.max(hRatio, vRatio);
    var centerShift_x = (canvas.width - img.width * ratio) / 2;
    var centerShift_y = (canvas.height - img.height * ratio) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShift_x,
      centerShift_y,
      img.width * ratio,
      img.height * ratio
    );
  }
  ScrollTrigger.create({

    trigger: "#page3",
    pin: true,
    scroller: `#main`,
    start: `top top`,
    end: `250% top`,
  });
}
canvas();




var clutter = "";

document.querySelector("#page4>h1").textContent.split("").forEach(function (dets) {
  clutter += `<span>${dets}</span>`

  document.querySelector("#page4>h1").innerHTML = clutter;
})

gsap.to("#page4>h1>span", {
  scrollTrigger: {
    trigger: `#page4>h1>span`,
    start: `top bottom`,
    end: `bottom top`,
    scroller: `#main`,
    scrub: .5,
    // markers: true
  },
  stagger: .2,
  color: `#fff`
})

function canvas1() {
  const canvas = document.querySelector("#page5>canvas");
  const context = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();
  });

  function files(index) {
    return `./Image${index + 1}.png`;
  }

  const frameCount = 791;
  const images = [];
  const imageSeq = { frame: 0 };
  let imagesLoaded = 0;

  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = files(i);
    img.onload = () => {
      imagesLoaded++;
      console.log(`Image ${i + 1} loaded (${imagesLoaded}/${frameCount})`);
      if (imagesLoaded === frameCount) {
        console.log("All images loaded. Starting animation.");
        gsap.to(imageSeq, {
          frame: frameCount - 1,
          snap: "frame",
          ease: "none", // Applying easing function for smoother transition
          scrollTrigger: {
            scrub: 1, // Higher scrub value for smoother transitions
            trigger: `#page5`,
            start: `top top`,
            end: `400% top`, // Increasing scroll distance for smoother animation
            scroller: `#main`,
          },
          onUpdate: render,
        });
      }
    };
    img.onerror = () => {
      console.error(`Failed to load image ${i + 1}`);
    };
    images.push(img);
  }

  function render() {
    console.log(`Rendering frame ${imageSeq.frame}`);
    if (images[imageSeq.frame]) {
      scaleImage(images[imageSeq.frame], context);
    }
  }

  function scaleImage(img, ctx) {
    const canvas = ctx.canvas;
    const hRatio = canvas.width / img.width;
    const vRatio = canvas.height / img.height;
    const ratio = Math.max(hRatio, vRatio);
    const centerShift_x = (canvas.width - img.width * ratio) / 2;
    const centerShift_y = (canvas.height - img.height * ratio) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShift_x,
      centerShift_y,
      img.width * ratio,
      img.height * ratio
    );
  }

  ScrollTrigger.create({
    trigger: "#page5",
    pin: true,
    scroller: `#main`,
    start: `top top`,
    end: `400% top`, // Sync with gsap scrollTrigger end value for smoother animation
    onEnter: () => console.log("ScrollTrigger entered"),
    onLeave: () => console.log("ScrollTrigger left"),
    onUpdate: (self) => console.log(`ScrollTrigger progress: ${self.progress}`)
  });
}

canvas1();






// function canvas1() {
//   const canvas = document.querySelector("#page5>canvas");
//   const context = canvas.getContext("2d");

//   canvas.width = window.innerWidth;
//   canvas.height = window.innerHeight;


//   window.addEventListener("resize", function () {
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
//     render();
//   });

//   function files(index) {
//     var data = '';
//     for (let i = 1; i <= 350; i++) {
//       data += `./Image${i}.jpg\n`;
//     }
//     // console.log(data);


//     return data.split("\n")[index];
//   }

//   const frameCount = 190;

//   const images = [];
//   const imageSeq = {
//     frame: 1,
//   };

//   for (let i = 0; i < frameCount; i++) {
//     const img = new Image();
//     img.src = files(i);
//     images.push(img);
//   }

//   gsap.to(imageSeq, {
//     frame: frameCount - 1,
//     snap: "frame",
//     ease: `none`,
//     scrollTrigger: {
//       scrub: .8,
//       trigger: `#page5`,
//       start: `top top`,
//       end: `250% top`,
//       scroller: `#main`,
//     },
//     onUpdate: render,
//   });

//   images[1].onload = render;

//   function render() {
//     scaleImage(images[imageSeq.frame], context);
//   }

//   function scaleImage(img, ctx) {
//     var canvas = ctx.canvas;
//     var hRatio = canvas.width / img.width;
//     var vRatio = canvas.height / img.height;
//     var ratio = Math.max(hRatio, vRatio);
//     var centerShift_x = (canvas.width - img.width * ratio) / 2;
//     var centerShift_y = (canvas.height - img.height * ratio) / 2;
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     ctx.drawImage(
//       img,
//       0,
//       0,
//       img.width,
//       img.height,
//       centerShift_x,
//       centerShift_y,
//       img.width * ratio,
//       img.height * ratio
//     );
//   }
//   ScrollTrigger.create({

//     trigger: "#page5",
//     pin: true,
//     scroller: `#main`,
//     start: `top top`,
//     end: `250% top`,
//   });
// }
// canvas1();






var clutter = "";

document.querySelector("#page6>h1").textContent.split("").forEach(function (dets) {
  clutter += `<span>${dets}</span>`

  document.querySelector("#page6>h1").innerHTML = clutter;
})

gsap.to("#page6>h1>span", {
  scrollTrigger: {
    trigger: `#page6>h1>span`,
    start: `top bottom`,
    end: `bottom top`,
    scroller: `#main`,
    scrub: .5,
    // markers: true
  },
  stagger: .2,
  color: `#fff`
})







function canvas2() {
  const canvas = document.querySelector("#page7>canvas");
  const context = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;


  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();
  });

  function files(index) {
    var data = `
  
  https://thisismagma.com/assets/home/lore/seq/1.webp?2
  https://thisismagma.com/assets/home/lore/seq/2.webp?2
  https://thisismagma.com/assets/home/lore/seq/3.webp?2
  https://thisismagma.com/assets/home/lore/seq/4.webp?2
  https://thisismagma.com/assets/home/lore/seq/5.webp?2
  https://thisismagma.com/assets/home/lore/seq/6.webp?2
  https://thisismagma.com/assets/home/lore/seq/7.webp?2
  https://thisismagma.com/assets/home/lore/seq/8.webp?2
  https://thisismagma.com/assets/home/lore/seq/9.webp?2
  https://thisismagma.com/assets/home/lore/seq/10.webp?2
  https://thisismagma.com/assets/home/lore/seq/11.webp?2
  https://thisismagma.com/assets/home/lore/seq/12.webp?2
  https://thisismagma.com/assets/home/lore/seq/13.webp?2
  https://thisismagma.com/assets/home/lore/seq/14.webp?2
  https://thisismagma.com/assets/home/lore/seq/15.webp?2
  https://thisismagma.com/assets/home/lore/seq/16.webp?2
  https://thisismagma.com/assets/home/lore/seq/17.webp?2
  https://thisismagma.com/assets/home/lore/seq/18.webp?2
  https://thisismagma.com/assets/home/lore/seq/19.webp?2
  https://thisismagma.com/assets/home/lore/seq/20.webp?2
  https://thisismagma.com/assets/home/lore/seq/21.webp?2
  https://thisismagma.com/assets/home/lore/seq/22.webp?2
  https://thisismagma.com/assets/home/lore/seq/23.webp?2
  https://thisismagma.com/assets/home/lore/seq/24.webp?2
  https://thisismagma.com/assets/home/lore/seq/25.webp?2
  https://thisismagma.com/assets/home/lore/seq/26.webp?2
  https://thisismagma.com/assets/home/lore/seq/27.webp?2
  https://thisismagma.com/assets/home/lore/seq/28.webp?2
  https://thisismagma.com/assets/home/lore/seq/29.webp?2
  https://thisismagma.com/assets/home/lore/seq/30.webp?2
  https://thisismagma.com/assets/home/lore/seq/31.webp?2
  https://thisismagma.com/assets/home/lore/seq/32.webp?2
  https://thisismagma.com/assets/home/lore/seq/33.webp?2
  https://thisismagma.com/assets/home/lore/seq/34.webp?2
  https://thisismagma.com/assets/home/lore/seq/35.webp?2
  https://thisismagma.com/assets/home/lore/seq/36.webp?2
  https://thisismagma.com/assets/home/lore/seq/37.webp?2
  https://thisismagma.com/assets/home/lore/seq/38.webp?2
  https://thisismagma.com/assets/home/lore/seq/39.webp?2
  https://thisismagma.com/assets/home/lore/seq/40.webp?2
  https://thisismagma.com/assets/home/lore/seq/41.webp?2
  https://thisismagma.com/assets/home/lore/seq/42.webp?2
  https://thisismagma.com/assets/home/lore/seq/43.webp?2
  https://thisismagma.com/assets/home/lore/seq/44.webp?2
  https://thisismagma.com/assets/home/lore/seq/45.webp?2
  https://thisismagma.com/assets/home/lore/seq/46.webp?2
  https://thisismagma.com/assets/home/lore/seq/47.webp?2
  https://thisismagma.com/assets/home/lore/seq/48.webp?2
  https://thisismagma.com/assets/home/lore/seq/49.webp?2
  https://thisismagma.com/assets/home/lore/seq/50.webp?2
  https://thisismagma.com/assets/home/lore/seq/51.webp?2
  https://thisismagma.com/assets/home/lore/seq/52.webp?2
  https://thisismagma.com/assets/home/lore/seq/53.webp?2
  https://thisismagma.com/assets/home/lore/seq/54.webp?2
  https://thisismagma.com/assets/home/lore/seq/55.webp?2
  https://thisismagma.com/assets/home/lore/seq/56.webp?2
  https://thisismagma.com/assets/home/lore/seq/57.webp?2
  https://thisismagma.com/assets/home/lore/seq/58.webp?2
  https://thisismagma.com/assets/home/lore/seq/59.webp?2
  https://thisismagma.com/assets/home/lore/seq/60.webp?2
  https://thisismagma.com/assets/home/lore/seq/61.webp?2
  https://thisismagma.com/assets/home/lore/seq/62.webp?2
  https://thisismagma.com/assets/home/lore/seq/63.webp?2
  https://thisismagma.com/assets/home/lore/seq/64.webp?2
  https://thisismagma.com/assets/home/lore/seq/65.webp?2
  https://thisismagma.com/assets/home/lore/seq/66.webp?2
  https://thisismagma.com/assets/home/lore/seq/67.webp?2
  https://thisismagma.com/assets/home/lore/seq/68.webp?2
  https://thisismagma.com/assets/home/lore/seq/69.webp?2
  https://thisismagma.com/assets/home/lore/seq/70.webp?2
  https://thisismagma.com/assets/home/lore/seq/71.webp?2
  https://thisismagma.com/assets/home/lore/seq/72.webp?2
  https://thisismagma.com/assets/home/lore/seq/73.webp?2
  https://thisismagma.com/assets/home/lore/seq/74.webp?2
  https://thisismagma.com/assets/home/lore/seq/75.webp?2
  https://thisismagma.com/assets/home/lore/seq/76.webp?2
  https://thisismagma.com/assets/home/lore/seq/77.webp?2
  https://thisismagma.com/assets/home/lore/seq/78.webp?2
  https://thisismagma.com/assets/home/lore/seq/79.webp?2
  https://thisismagma.com/assets/home/lore/seq/80.webp?2
  https://thisismagma.com/assets/home/lore/seq/81.webp?2
  https://thisismagma.com/assets/home/lore/seq/82.webp?2
  https://thisismagma.com/assets/home/lore/seq/83.webp?2
  https://thisismagma.com/assets/home/lore/seq/84.webp?2
  https://thisismagma.com/assets/home/lore/seq/85.webp?2
  https://thisismagma.com/assets/home/lore/seq/86.webp?2
  https://thisismagma.com/assets/home/lore/seq/87.webp?2
  https://thisismagma.com/assets/home/lore/seq/88.webp?2
  https://thisismagma.com/assets/home/lore/seq/89.webp?2
  https://thisismagma.com/assets/home/lore/seq/90.webp?2
  https://thisismagma.com/assets/home/lore/seq/91.webp?2
  https://thisismagma.com/assets/home/lore/seq/92.webp?2
  https://thisismagma.com/assets/home/lore/seq/93.webp?2
  https://thisismagma.com/assets/home/lore/seq/94.webp?2
  https://thisismagma.com/assets/home/lore/seq/95.webp?2
  https://thisismagma.com/assets/home/lore/seq/96.webp?2
  https://thisismagma.com/assets/home/lore/seq/97.webp?2
  https://thisismagma.com/assets/home/lore/seq/98.webp?2
  https://thisismagma.com/assets/home/lore/seq/99.webp?2
  https://thisismagma.com/assets/home/lore/seq/100.webp?2
  https://thisismagma.com/assets/home/lore/seq/101.webp?2
  https://thisismagma.com/assets/home/lore/seq/102.webp?2
  https://thisismagma.com/assets/home/lore/seq/103.webp?2
  https://thisismagma.com/assets/home/lore/seq/104.webp?2
  https://thisismagma.com/assets/home/lore/seq/105.webp?2
  https://thisismagma.com/assets/home/lore/seq/106.webp?2
  https://thisismagma.com/assets/home/lore/seq/107.webp?2
  https://thisismagma.com/assets/home/lore/seq/108.webp?2
  https://thisismagma.com/assets/home/lore/seq/109.webp?2
  https://thisismagma.com/assets/home/lore/seq/110.webp?2
  https://thisismagma.com/assets/home/lore/seq/111.webp?2
  https://thisismagma.com/assets/home/lore/seq/112.webp?2
  https://thisismagma.com/assets/home/lore/seq/113.webp?2
  https://thisismagma.com/assets/home/lore/seq/114.webp?2
  https://thisismagma.com/assets/home/lore/seq/115.webp?2
  https://thisismagma.com/assets/home/lore/seq/116.webp?2
  https://thisismagma.com/assets/home/lore/seq/117.webp?2
  https://thisismagma.com/assets/home/lore/seq/118.webp?2
  https://thisismagma.com/assets/home/lore/seq/119.webp?2
  https://thisismagma.com/assets/home/lore/seq/120.webp?2
  https://thisismagma.com/assets/home/lore/seq/121.webp?2
  https://thisismagma.com/assets/home/lore/seq/122.webp?2
  https://thisismagma.com/assets/home/lore/seq/123.webp?2
  https://thisismagma.com/assets/home/lore/seq/124.webp?2
  https://thisismagma.com/assets/home/lore/seq/125.webp?2
  https://thisismagma.com/assets/home/lore/seq/126.webp?2
  https://thisismagma.com/assets/home/lore/seq/127.webp?2
  https://thisismagma.com/assets/home/lore/seq/128.webp?2
  https://thisismagma.com/assets/home/lore/seq/129.webp?2
  https://thisismagma.com/assets/home/lore/seq/130.webp?2
  https://thisismagma.com/assets/home/lore/seq/131.webp?2
  https://thisismagma.com/assets/home/lore/seq/132.webp?2
  https://thisismagma.com/assets/home/lore/seq/133.webp?2
  https://thisismagma.com/assets/home/lore/seq/134.webp?2
  https://thisismagma.com/assets/home/lore/seq/135.webp?2
  https://thisismagma.com/assets/home/lore/seq/136.webp?2
  
  `;
    return data.split("\n")[index];
  }

  const frameCount = 136;

  const images = [];
  const imageSeq = {
    frame: 1,
  };

  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = files(i);
    images.push(img);
  }

  gsap.to(imageSeq, {
    frame: frameCount - 1,
    snap: "frame",
    ease: `none`,
    scrollTrigger: {
      scrub: .5,
      trigger: `#page7`,
      start: `top top`,
      end: `250% top`,
      scroller: `#main`,
    },
    onUpdate: render,
  });

  images[1].onload = render;

  function render() {
    scaleImage(images[imageSeq.frame], context);
  }

  function scaleImage(img, ctx) {
    var canvas = ctx.canvas;
    var hRatio = canvas.width / img.width;
    var vRatio = canvas.height / img.height;
    var ratio = Math.max(hRatio, vRatio);
    var centerShift_x = (canvas.width - img.width * ratio) / 2;
    var centerShift_y = (canvas.height - img.height * ratio) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShift_x,
      centerShift_y,
      img.width * ratio,
      img.height * ratio
    );
  }
  ScrollTrigger.create({

    trigger: "#page7",
    pin: true,
    scroller: `#main`,
    start: `top top`,
    end: `250% top`,
  });
}
canvas2()







gsap.to(".page7-cir", {
  scrollTrigger: {
    trigger: `.page7-cir`,
    start: `top center`,
    end: `bottom top`,
    scroller: `#main`,
    scrub: .6
  },
  scale: 1.5
})



gsap.to(".page7-cir-inner", {
  scrollTrigger: {
    trigger: `.page7-cir-inner`,
    start: `top center`,
    end: `bottom top`,
    scroller: `#main`,
    scrub: .5
  },
  backgroundColor: `#0a3bce91`,
})

var swiper = new Swiper('.swiper-container', {
  loop: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

// Function to sync Swiper with scroll
function syncSwiperWithScroll() {
  var scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
  var totalSlides = swiper.slides.length - swiper.loopedSlides * 2; // Correct number of slides
  var slideIndex = Math.floor(scrollPercent * totalSlides);

  // Ensure slideIndex does not exceed total slides
  if (slideIndex >= totalSlides) {
    slideIndex = totalSlides - 1;
  }

  // Reset to the first slide if scrolled to the top
  if (window.scrollY === 0) {
    slideIndex = 0;
  }

  swiper.slideToLoop(slideIndex, 0);
}

// Add scroll event listener
window.addEventListener('scroll', syncSwiperWithScroll);

