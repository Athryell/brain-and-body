const tl = gsap.timeline({ defaults: {duration: 0.5}})

tl.fromTo('.group-memory', {scale: 0},{scale: 1})
tl.fromTo('.group-workout', {scale: 0},{scale: 1})
tl.fromTo('.group-speed', {scale: 0},{scale: 1})
tl.fromTo('.group-tabata', {scale: 0},{scale: 1})
