jQuery('document').ready(() => {
  var heading = {};
  heading.opacityIn = [0, 1];
  heading.sclaeIn = [0.2, 1];
  heading.scaleOut = 3;
  heading.durationIn = 800;
  heading.durationOut = 600;
  heading.delay = 500;

  AOS.init({ disable: 'mobile' });

  anime
    .timeline({ loop: true })
    .add({
      targets: '.heading-title .letters-1',
      opacity: heading.opacityIn,
      scale: heading.scaleIn,
      duration: heading.durationIn,
    })
    .add({
      targets: '.heading-title .letters-1',
      opacity: 0,
      scale: heading.scaleOut,
      duration: heading.durationOut,
      easing: 'easeInExpo',
      delay: heading.delay,
    })
    .add({
      targets: '.heading-title .letters-2',
      opacity: heading.opacityIn,
      scale: heading.scaleIn,
      duration: heading.durationIn,
    })
    .add({
      targets: '.heading-title .letters-2',
      opacity: 0,
      scale: heading.scaleOut,
      duration: heading.durationOut,
      easing: 'easeInExpo',
      delay: heading.delay,
    })
    .add({
      targets: '.heading-title .letters-3',
      opacity: heading.opacityIn,
      scale: heading.scaleIn,
      duration: heading.durationIn,
    })
    .add({
      targets: '.heading-title .letters-3',
      opacity: 0,
      scale: heading.scaleOut,
      duration: heading.durationOut,
      easing: 'easeInExpo',
      delay: heading.delay,
    })
    .add({
      targets: '.heading-title',
      opacity: 0,
      duration: 500,
      delay: 500,
    });
});
