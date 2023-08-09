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
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});


// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();


// gsap

let tl = gsap.timeline({
  scrollTrigger:{
    trigger:'#page-1',
    scroller:'#main',
    markers:true,
    start:'top -47%',
    end:'500% -170%',
    scrub:.1,
    pin:true,
  }
})
tl.to('#part-1',{
  x:'-300'
},'amine')
tl.to('#part-2',{
  y:-130,
  duration:.1,
},'amine')
tl.to('#part-2',{
  width:'1800vw',
  duration:2,
},'amine')
tl.to('#page-1 p,#page-1 #spain',{
  y:'-100vh',
  duration:1
},'amine')
tl.to('#part-3',{
  x:'300'
},'amine')
tl.to('#part-1',{
  x:'-300'
},'amine')
tl.from('#image-container h1',{
  y:600,
},'amine')
tl.to('#part-2 h1',{
  y:'-300vh',
  duration:1,
},'amine')

// second

// back ground color change
gsap.to('#main',{
  backgroundColor:'#ffff',
  scrollTrigger:{
    trigger:'#page-3',
    scroller:'#main',
    // markers:true,
    start:'top 10%',
    end:'top -5%',
    scrub:5,
    pin:true,
  }
})

//************** page-6 ******************
gsap.to('#slide-2>h1',{
  scrollTrigger:{
    trigger:'#slide-2>h1',
    scroller:'#main',
    start:'70% 50%',
    end:'100% 40%',
    markers:true,
    scrub:.15
  },
  backgroundColor:'green',
  x:'-1000vw',
  // duration:.1
})