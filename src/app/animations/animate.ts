import {trigger,transition,style,animate,state,keyframes} from '@angular/animations';
let defaultT='0.3s ease-out';
export function slideWidthToggle(t=defaultT,style1={width:0}):any{
  return trigger('SlideWidthToggle',[
    state('hidden',style({display:'none'})),
    state('show',style({display:'inline-block'})),
      transition('hidden=>show',[style(style1),animate(t)]),
      transition('show=>hidden',[animate(t,style(style1))])
  ])
}

export function slideRightToggle(t=defaultT,style1={transform:'translateX(-100%)',opacity:0}):any{
  return trigger('SlideRightToggle',[
    state('hidden',style({display:'none'})),
    state('show',style({display:'inline-block'})),
    transition('hidden=>show',[style(style1),animate(t)]),
    transition('show=>hidden',[animate(t,style(style1))])
  ])
}
export function slideLeftToggle(t=defaultT,style1={transform:'translateX(100%)',opacity:0}):any{
  return trigger('SlideLeftToggle',[
    state('hidden',style({display:'none'})),
    state('show',style({display:'inline-block'})),
    transition('hidden=>show',[style(style1),animate(t)]),
    transition('show=>hidden',[animate(t,style(style1))])
  ])
}

export function slideHeightToggle(t=defaultT,style1={height:0}):any{
  return trigger('SlideHeightToggle',[
    state('hidden',style({display:'none'})),
    state('show',style({display:'inline-block'})),
    transition('hidden=>show',[style(style1),animate(t)]),
    transition('show=>hidden',[animate(t,style(style1))])
  ])
}

export function fadeToggle(t=defaultT,style1={opacity:0}):any{
  return trigger('FadeToggle',[
    state('show',style({display:'inline-block'})),
    state('hidden',style({display:'none'})),
    transition('hidden=>show',[style(style1),animate(t)]),
    transition('show=>hidden',[animate(t,style(style1))])
  ])
}
export function fadeToggle2(t=defaultT,style1={opacity:0}):any{
  return trigger('FadeToggle2',[
    state('show',style({visibility:'visible'})),
    state('hidden',style({visibility:'hidden'})),
    transition('hidden=>show',[style(style1),animate(t)]),
    transition('show=>hidden',[animate(t,style(style1))])
  ])
}
export function fadeOut(t='0.4s ease-out'):any{
  return trigger('FadeOut',[
    transition('void=>*',[style({opacity:0}),animate(t)]),
  ])
}
export function colour(t='2s ease-out'):any{
  return trigger('Colour',[
    transition('*=>show',[style({background:'indianred'}),animate(t)]),
  ])
}
export function movieAnimation(t='0.1s ease-out',t2='0.5s ease-out'):any{
  return trigger('MovieAnimation',[
    state('hidden',style({display:'none'})),
    state('show',style({display:'block'})),
    state('normal',style({opacity:0})),
    state('fadeIn',style({display:'none'})),
    state('fadeOut',style({display:'block'})),
    transition('fadeIn=>fadeOut',[style({transform:'translateX(-30%)'}),animate(t2)]),
    transition('hidden=>show',[style({transform:'translateX(-100%)',opacity:0}),animate(t)]),
    transition('normal=>*',[animate(t2,style({opacity:1}))])
  ])
}

export function movieLoading3(t=defaultT,p='-5%'):any{
  return trigger('MovieLoading3',[
    transition('void=>*',[style({transform:'translateX('+p+')'}),animate(t)])
  ])
}
export function movieLoading(t=defaultT):any{
  return trigger('MovieLoading',[
    transition('void=>*',[style({transform:'translateY(-100%)'}),animate(t)])
  ])
}
export function movieLoading2(t=defaultT,p='100%'):any{
  return trigger('MovieLoading2',[
    transition('void=>*',[style({transform:'translateY('+p+')'}),animate(t)])
  ])

}
export function playMovie(t=defaultT):any{
  return trigger('PlayMovie',[
    state('hidden',style({display:'none',position:'absolute'})),
    state('show',style({display:'block',position:'absolute'})),
    transition('hidden=>show',[style({transform:'translateY(100%)'}),animate(t)]),
    transition('show=>hidden',[animate(t,style({transform:'translateY(-100%)'}))])
  ])
}
export function slideHeightLight(t=defaultT):any{
  return trigger('SlideHeightLight',[
    state('hidden',style({bottom:'-45%'})),
    state('show',style({bottom:0})),
    transition('hidden=>*',[style({}),animate(t)]),
    transition('show=>*',[animate(t)])
  ])
}
