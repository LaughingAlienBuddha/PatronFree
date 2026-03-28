(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,61589,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var a={formatUrl:function(){return l},formatWithValidation:function(){return c},urlObjectKeys:function(){return s}};for(var n in a)Object.defineProperty(r,n,{enumerable:!0,get:a[n]});let i=e.r(35747)._(e.r(76252)),o=/https?|ftp|gopher|file/;function l(e){let{auth:t,hostname:r}=e,a=e.protocol||"",n=e.pathname||"",l=e.hash||"",s=e.query||"",c=!1;t=t?encodeURIComponent(t).replace(/%3A/i,":")+"@":"",e.host?c=t+e.host:r&&(c=t+(~r.indexOf(":")?`[${r}]`:r),e.port&&(c+=":"+e.port)),s&&"object"==typeof s&&(s=String(i.urlQueryToSearchParams(s)));let d=e.search||s&&`?${s}`||"";return a&&!a.endsWith(":")&&(a+=":"),e.slashes||(!a||o.test(a))&&!1!==c?(c="//"+(c||""),n&&"/"!==n[0]&&(n="/"+n)):c||(c=""),l&&"#"!==l[0]&&(l="#"+l),d&&"?"!==d[0]&&(d="?"+d),n=n.replace(/[?#]/g,encodeURIComponent),d=d.replace("#","%23"),`${a}${c}${n}${d}${l}`}let s=["auth","hash","host","hostname","href","path","pathname","port","protocol","query","search","slashes"];function c(e){return l(e)}},99702,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"useMergedRef",{enumerable:!0,get:function(){return n}});let a=e.r(42796);function n(e,t){let r=(0,a.useRef)(null),n=(0,a.useRef)(null);return(0,a.useCallback)(a=>{if(null===a){let e=r.current;e&&(r.current=null,e());let t=n.current;t&&(n.current=null,t())}else e&&(r.current=i(e,a)),t&&(n.current=i(t,a))},[e,t])}function i(e,t){if("function"!=typeof e)return e.current=t,()=>{e.current=null};{let r=e(t);return"function"==typeof r?r:()=>e(null)}}("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},32592,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"isLocalURL",{enumerable:!0,get:function(){return i}});let a=e.r(66537),n=e.r(46773);function i(e){if(!(0,a.isAbsoluteUrl)(e))return!0;try{let t=(0,a.getLocationOrigin)(),r=new URL(e,t);return r.origin===t&&(0,n.hasBasePath)(r.pathname)}catch(e){return!1}}},49327,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"errorOnce",{enumerable:!0,get:function(){return a}});let a=e=>{}},52050,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var a={default:function(){return x},useLinkStatus:function(){return v}};for(var n in a)Object.defineProperty(r,n,{enumerable:!0,get:a[n]});let i=e.r(35747),o=e.r(95457),l=i._(e.r(42796)),s=e.r(61589),c=e.r(83274),d=e.r(99702),u=e.r(66537),p=e.r(2059);e.r(52248);let h=e.r(40706),f=e.r(59401),g=e.r(32592),b=e.r(11874);function x(t){var r,a;let n,i,x,[v,y]=(0,l.useOptimistic)(f.IDLE_LINK_STATUS),j=(0,l.useRef)(null),{href:w,as:k,children:N,prefetch:C=null,passHref:S,replace:z,shallow:P,scroll:M,onClick:A,onMouseEnter:F,onTouchStart:T,legacyBehavior:_=!1,onNavigate:R,transitionTypes:I,ref:B,unstable_dynamicOnHover:E,...O}=t;n=N,_&&("string"==typeof n||"number"==typeof n)&&(n=(0,o.jsx)("a",{children:n}));let L=l.default.useContext(c.AppRouterContext),U=!1!==C,$=!1!==C?null===(a=C)||"auto"===a?b.FetchStrategy.PPR:b.FetchStrategy.Full:b.FetchStrategy.PPR,D="string"==typeof(r=k||w)?r:(0,s.formatUrl)(r);if(_){if(n?.$$typeof===Symbol.for("react.lazy"))throw Object.defineProperty(Error("`<Link legacyBehavior>` received a direct child that is either a Server Component, or JSX that was loaded with React.lazy(). This is not supported. Either remove legacyBehavior, or make the direct child a Client Component that renders the Link's `<a>` tag."),"__NEXT_ERROR_CODE",{value:"E863",enumerable:!1,configurable:!0});i=l.default.Children.only(n)}let H=_?i&&"object"==typeof i&&i.ref:B,W=l.default.useCallback(e=>(null!==L&&(j.current=(0,f.mountLinkInstance)(e,D,L,$,U,y)),()=>{j.current&&((0,f.unmountLinkForCurrentNavigation)(j.current),j.current=null),(0,f.unmountPrefetchableInstance)(e)}),[U,D,L,$,y]),K={ref:(0,d.useMergedRef)(W,H),onClick(t){_||"function"!=typeof A||A(t),_&&i.props&&"function"==typeof i.props.onClick&&i.props.onClick(t),!L||t.defaultPrevented||function(t,r,a,n,i,o,s){if("u">typeof window){let c,{nodeName:d}=t.currentTarget;if("A"===d.toUpperCase()&&((c=t.currentTarget.getAttribute("target"))&&"_self"!==c||t.metaKey||t.ctrlKey||t.shiftKey||t.altKey||t.nativeEvent&&2===t.nativeEvent.which)||t.currentTarget.hasAttribute("download"))return;if(!(0,g.isLocalURL)(r)){n&&(t.preventDefault(),location.replace(r));return}if(t.preventDefault(),o){let e=!1;if(o({preventDefault:()=>{e=!0}}),e)return}let{dispatchNavigateAction:u}=e.r(8541);l.default.startTransition(()=>{u(r,n?"replace":"push",!1===i?h.ScrollBehavior.NoScroll:h.ScrollBehavior.Default,a.current,s)})}}(t,D,j,z,M,R,I)},onMouseEnter(e){_||"function"!=typeof F||F(e),_&&i.props&&"function"==typeof i.props.onMouseEnter&&i.props.onMouseEnter(e),L&&U&&(0,f.onNavigationIntent)(e.currentTarget,!0===E)},onTouchStart:function(e){_||"function"!=typeof T||T(e),_&&i.props&&"function"==typeof i.props.onTouchStart&&i.props.onTouchStart(e),L&&U&&(0,f.onNavigationIntent)(e.currentTarget,!0===E)}};return(0,u.isAbsoluteUrl)(D)?K.href=D:_&&!S&&("a"!==i.type||"href"in i.props)||(K.href=(0,p.addBasePath)(D)),x=_?l.default.cloneElement(i,K):(0,o.jsx)("a",{...O,...K,children:n}),(0,o.jsx)(m.Provider,{value:v,children:x})}e.r(49327);let m=(0,l.createContext)(f.IDLE_LINK_STATUS),v=()=>(0,l.useContext)(m);("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},10104,e=>{"use strict";var t=e.i(30944);e.s(["onAuthStateChanged",()=>t.z])},56909,86270,e=>{"use strict";var t=e.i(30944);e.s(["signInWithRedirect",()=>t.g],56909),e.s(["formatAuthError",0,function(e){switch("object"==typeof e&&null!==e&&"code"in e?String(e.code):""){case"auth/unauthorized-domain":return"This domain is not allowed for sign-in. In Firebase Console → Authentication → Settings → Authorized domains, add your GitHub Pages host (e.g. yourname.github.io).";case"auth/operation-not-allowed":return"This sign-in provider is disabled. Enable Google/GitHub under Firebase Console → Authentication → Sign-in method.";case"auth/invalid-api-key":return"Invalid API key. In Google Cloud → APIs & Credentials → your Browser key → Application restrictions, add an HTTP referrer for your live site (e.g. https://yourname.github.io/*).";default:if("object"==typeof e&&null!==e&&"message"in e)return String(e.message);return"Sign-in failed. Check Firebase authorized domains and API key referrer restrictions."}}],86270)},56809,e=>{"use strict";var t=e.i(95457),r=e.i(52050),a=e.i(42796),n=e.i(60235);e.i(45925);var i=e.i(30944),i=i,o=e.i(56909),l=i,s=e.i(10104),c=e.i(97643),d=e.i(86270);let u=[{id:"creator",label:"Creator",icon:"✦",desc:"Share your work"},{id:"developer",label:"Developer",icon:"⟨/⟩",desc:"Build & ship"},{id:"supporter",label:"Supporter",icon:"♥",desc:"Back creators"}];e.s(["default",0,function(){let e=(0,n.useRouter)(),[p,h]=(0,a.useState)(""),[f,g]=(0,a.useState)(""),[b,x]=(0,a.useState)(""),[m,v]=(0,a.useState)(""),[y,j]=(0,a.useState)(""),[w,k]=(0,a.useState)(!1),[N,C]=(0,a.useState)(null),[S,z]=(0,a.useState)(null),P=(0,a.useRef)(null);return(0,a.useEffect)(()=>{let t=(0,s.onAuthStateChanged)(c.auth,t=>{t&&e.push("/dashboard")});return()=>t()},[e]),(0,a.useEffect)(()=>{let e,t=P.current;if(!t)return;let r=t.getContext("2d");if(!r)return;let a=t.width=window.innerWidth,n=t.height=window.innerHeight,i=[];for(let e=0;e<80;e++)i.push({x:Math.random()*a,y:Math.random()*n,vx:(Math.random()-.5)*.35,vy:(Math.random()-.5)*.35,r:1.5*Math.random()+.5,alpha:.6*Math.random()+.1,alphaDir:(Math.random()>.5?1:-1)*.004});let o=()=>{for(let e of(r.clearRect(0,0,a,n),i))e.x+=e.vx,e.y+=e.vy,e.alpha+=e.alphaDir,(e.alpha<=.05||e.alpha>=.85)&&(e.alphaDir*=-1),e.x<0&&(e.x=a),e.x>a&&(e.x=0),e.y<0&&(e.y=n),e.y>n&&(e.y=0),r.beginPath(),r.arc(e.x,e.y,e.r,0,2*Math.PI),r.fillStyle=`rgba(180, 220, 255, ${e.alpha})`,r.fill();e=requestAnimationFrame(o)};o();let l=()=>{a=t.width=window.innerWidth,n=t.height=window.innerHeight};return window.addEventListener("resize",l),()=>{cancelAnimationFrame(e),window.removeEventListener("resize",l)}},[]),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("style",{children:`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

        @keyframes gradShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes blobFloat {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          25%  { transform: translate(18px, -22px) scale(1.05); }
          50%  { transform: translate(-12px, -10px) scale(0.96); }
          75%  { transform: translate(14px, 16px) scale(1.03); }
        }
        @keyframes cardInUp {
          from { opacity: 0; transform: translateY(32px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.45; }
          50%       { opacity: 0.85; }
        }

        * { box-sizing: border-box; }

        .auth-root {
          font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
          min-height: 100vh;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 1rem;
          overflow: hidden;
          background: #060916;
        }

        .auth-grad {
          position: absolute; inset: 0;
          background: linear-gradient(
            130deg,
            #06091a 0%, #0d1b45 25%, #0a1628 50%, #141042 75%, #06091a 100%
          );
          background-size: 400% 400%;
          animation: gradShift 12s ease infinite;
          z-index: 0;
        }

        .auth-vignette {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at center, transparent 38%, rgba(0,0,0,0.75) 100%);
          z-index: 1; pointer-events: none;
        }

        .blob {
          position: absolute; border-radius: 50%;
          filter: blur(80px); pointer-events: none;
        }
        .blob-1 {
          width: 420px; height: 420px;
          background: radial-gradient(circle, rgba(30,80,200,0.55) 0%, transparent 70%);
          top: -120px; left: -120px;
          animation: blobFloat 14s ease-in-out infinite; z-index: 1;
        }
        .blob-2 {
          width: 360px; height: 360px;
          background: radial-gradient(circle, rgba(0,180,200,0.4) 0%, transparent 70%);
          bottom: -100px; right: -100px;
          animation: blobFloat 17s ease-in-out infinite reverse;
          animation-delay: -3s; z-index: 1;
        }
        .blob-3 {
          width: 260px; height: 260px;
          background: radial-gradient(circle, rgba(100,60,220,0.35) 0%, transparent 70%);
          bottom: 18%; left: 6%;
          animation: blobFloat 11s ease-in-out infinite;
          animation-delay: -6s; z-index: 1;
        }
        .blob-4 {
          width: 200px; height: 200px;
          background: radial-gradient(circle, rgba(20,120,220,0.4) 0%, transparent 70%);
          top: 15%; right: 8%;
          animation: blobFloat 13s ease-in-out infinite reverse;
          animation-delay: -2s; z-index: 1;
        }

        .auth-canvas {
          position: absolute; inset: 0;
          z-index: 2; pointer-events: none;
        }

        .auth-glow {
          position: absolute;
          width: 700px; height: 700px; border-radius: 50%;
          background: radial-gradient(circle, rgba(56,130,250,0.16) 0%, transparent 70%);
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          z-index: 3; pointer-events: none;
          animation: pulseGlow 6s ease-in-out infinite;
        }

        /* ── Back button ── */
        .back-btn {
          position: fixed;
          top: 20px; left: 20px;
          z-index: 100;
          display: flex; align-items: center; gap: 7px;
          padding: 8px 16px 8px 11px;
          border-radius: 999px;
          background: rgba(255,255,255,0.1);
          border: 1.5px solid rgba(255,255,255,0.25);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          color: #ffffff;
          font-size: 13px; font-weight: 600;
          text-decoration: none; letter-spacing: 0.01em;
          transition: background 0.25s, border-color 0.25s, transform 0.25s, box-shadow 0.25s;
          font-family: inherit;
        }
        .back-btn:hover {
          background: rgba(99,179,237,0.22);
          border-color: rgba(99,179,237,0.7);
          box-shadow: 0 0 20px rgba(99,179,237,0.35);
          transform: translateX(-4px);
          color: #a5f3fc;
        }
        .back-btn svg { flex-shrink: 0; transition: transform 0.25s; }
        .back-btn:hover svg { transform: translateX(-2px); }

        /* ── Card ── */
        .auth-card {
          position: relative; z-index: 10;
          width: 100%; max-width: 480px;
          background: rgba(10,15,35,0.72);
          backdrop-filter: blur(28px);
          -webkit-backdrop-filter: blur(28px);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 28px;
          padding: 2.25rem 2.25rem 2rem;
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.04) inset,
            0 32px 80px rgba(0,0,0,0.65),
            0 0 100px rgba(56,130,250,0.12);
          animation: cardInUp 0.55s cubic-bezier(0.22,1,0.36,1) both;
        }

        .card-shimmer {
          position: absolute;
          top: 0; left: 12%; right: 12%; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(120,200,255,0.6), rgba(200,220,255,0.5), rgba(120,200,255,0.6), transparent);
          border-radius: 50%; filter: blur(0.5px);
        }

        /* Logo */
        .auth-logo {
          display: flex; align-items: center; justify-content: center;
          gap: 10px; margin-bottom: 1.2rem;
        }
        .logo-icon {
          width: 36px; height: 36px;
          background: linear-gradient(135deg, #38bdf8, #3b82f6, #7c3aed);
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-weight: 900; font-size: 15px; color: #fff;
          box-shadow: 0 0 20px rgba(56,189,248,0.45), 0 3px 10px rgba(0,0,0,0.4);
        }
        .logo-name {
          font-size: 1.2rem; font-weight: 800;
          color: #f0f8ff; letter-spacing: -0.02em;
        }

        /* Title */
        .auth-title {
          font-size: 1.85rem; font-weight: 900; text-align: center;
          background: linear-gradient(135deg, #e0f2fe 0%, #7dd3fc 40%, #818cf8 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          margin: 0 0 0.3rem; letter-spacing: -0.03em; line-height: 1.1;
        }
        .auth-subtitle {
          text-align: center; color: rgba(200,230,255,0.45);
          font-size: 0.83rem; margin-bottom: 1.35rem;
        }

        /* Social */
        .social-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 10px; margin-bottom: 1.25rem;
        }
        .social-btn {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          padding: 10px 16px; border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.05);
          color: #e0f2fe; font-size: 13px; font-weight: 600;
          cursor: pointer; letter-spacing: 0.02em;
          transition: all 0.25s cubic-bezier(0.34,1.56,0.64,1);
          font-family: inherit;
        }
        .social-btn:hover {
          background: rgba(99,179,237,0.14);
          border-color: rgba(99,179,237,0.5);
          box-shadow: 0 0 22px rgba(99,179,237,0.18);
          transform: translateY(-2px) scale(1.03);
        }
        .social-icon { width: 18px; height: 18px; flex-shrink: 0; }

        /* Divider */
        .divider { display: flex; align-items: center; gap: 10px; margin-bottom: 1.15rem; }
        .divider-line { flex: 1; height: 1px; background: linear-gradient(90deg, transparent, rgba(120,180,255,0.2), transparent); }
        .divider-text { font-size: 10px; font-weight: 500; color: rgba(200,230,255,0.35); white-space: nowrap; letter-spacing: 0.07em; text-transform: uppercase; }

        /* Role selection */
        .role-section { margin-bottom: 1.1rem; }
        .role-heading { font-size: 11px; font-weight: 700; color: rgba(200,230,255,0.6); letter-spacing: 0.06em; text-transform: uppercase; display: block; margin-bottom: 0.55rem; }
        .role-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 8px; }
        .role-btn {
          display: flex; flex-direction: column; align-items: center; gap: 3px;
          padding: 12px 8px 10px; border-radius: 16px;
          border: 1px solid rgba(120,180,255,0.16);
          background: rgba(255,255,255,0.04);
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1);
          font-family: inherit;
        }
        .role-btn:hover {
          border-color: rgba(120,200,255,0.45);
          background: rgba(120,200,255,0.09);
          transform: translateY(-3px) scale(1.04);
          box-shadow: 0 6px 20px rgba(120,200,255,0.14);
        }
        .role-btn.active {
          border-color: rgba(120,200,255,0.75);
          background: rgba(56,189,248,0.15);
          box-shadow: 0 0 24px rgba(56,189,248,0.22), 0 0 0 1px rgba(120,200,255,0.35) inset;
          transform: translateY(-3px) scale(1.05);
        }
        .role-icon { font-size: 18px; color: #7dd3fc; line-height: 1; }
        .role-btn.active .role-icon { color: #38bdf8; }
        .role-name { font-size: 12px; font-weight: 700; color: rgba(220,242,255,0.85); letter-spacing: 0.01em; }
        .role-desc { font-size: 10px; color: rgba(200,230,255,0.38); letter-spacing: 0.01em; }

        /* Fields */
        .fields { display: flex; flex-direction: column; gap: 12px; }
        .field { display: flex; flex-direction: column; gap: 6px; }
        .field-label { font-size: 11px; font-weight: 700; color: rgba(200,230,255,0.6); letter-spacing: 0.06em; text-transform: uppercase; }
        .name-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }

        .input-wrap {
          display: flex; align-items: center; gap: 10px;
          padding: 0 14px; height: 46px; border-radius: 14px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(120,180,255,0.18);
          transition: border-color 0.25s, box-shadow 0.25s, background 0.25s;
        }
        .input-wrap.focused {
          border-color: rgba(120,200,255,0.6);
          box-shadow: 0 0 0 3px rgba(120,200,255,0.12), 0 0 24px rgba(120,200,255,0.1);
          background: rgba(255,255,255,0.07);
        }
        .input-icon { width: 16px; height: 16px; color: rgba(120,200,255,0.4); flex-shrink: 0; transition: color 0.25s; }
        .input-wrap.focused .input-icon { color: rgba(120,200,255,0.9); }
        .auth-input {
          flex: 1; width: 100%; background: transparent; border: none; outline: none;
          color: #e0f2fe; font-size: 13.5px; font-family: inherit; caret-color: #7dd3fc;
        }
        .auth-input::placeholder { color: rgba(200,230,255,0.2); }

        /* Terms */
        .terms-row { display: flex; align-items: flex-start; gap: 8px; }
        .auth-checkbox { width: 15px; height: 15px; margin-top: 1px; accent-color: #38bdf8; cursor: pointer; flex-shrink: 0; }
        .terms-label { font-size: 12px; color: rgba(200,230,255,0.4); line-height: 1.45; }
        .terms-link { color: rgba(120,200,255,0.75); text-decoration: underline; text-decoration-color: rgba(120,200,255,0.3); transition: color 0.2s; }
        .terms-link:hover { color: #7dd3fc; }

        /* CTA */
        .cta-btn {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          width: 100%; height: 52px; border-radius: 999px; border: none;
          background: linear-gradient(135deg, #3b82f6 0%, #38bdf8 55%, #67e8f9 100%);
          color: #05111f; font-size: 15px; font-weight: 800;
          cursor: pointer; letter-spacing: 0.02em; margin-top: 4px;
          box-shadow: 0 4px 28px rgba(56,189,248,0.4), 0 1px 0 rgba(255,255,255,0.25) inset;
          transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s;
          position: relative; overflow: hidden; font-family: inherit;
        }
        .cta-btn::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg, #67e8f9 0%, #e0f2fe 100%);
          opacity: 0; transition: opacity 0.3s;
        }
        .cta-btn:hover { transform: translateY(-3px) scale(1.02); box-shadow: 0 14px 40px rgba(56,189,248,0.55), 0 0 0 1px rgba(120,200,255,0.4); }
        .cta-btn:hover::before { opacity: 1; }
        .cta-btn:active { transform: translateY(-1px) scale(0.99); }
        .cta-btn > * { position: relative; z-index: 1; }

        /* Toggle */
        .toggle-text { text-align: center; font-size: 13px; color: rgba(200,230,255,0.4); margin-top: 18px; }
        .toggle-link { color: #7dd3fc; font-weight: 700; text-decoration: none; position: relative; transition: color 0.25s; }
        .toggle-link::after {
          content: ''; position: absolute; bottom: -1px; left: 0; right: 0;
          height: 1px; background: linear-gradient(90deg, #7dd3fc, #818cf8);
          transform: scaleX(0); transform-origin: left; transition: transform 0.3s;
        }
        .toggle-link:hover { color: #e0f2fe; }
        .toggle-link:hover::after { transform: scaleX(1); }
      `}),(0,t.jsxs)("div",{className:"auth-root",children:[(0,t.jsx)("div",{className:"auth-grad"}),(0,t.jsx)("div",{className:"blob blob-1"}),(0,t.jsx)("div",{className:"blob blob-2"}),(0,t.jsx)("div",{className:"blob blob-3"}),(0,t.jsx)("div",{className:"blob blob-4"}),(0,t.jsx)("div",{className:"auth-vignette"}),(0,t.jsx)("canvas",{ref:P,className:"auth-canvas"}),(0,t.jsx)("div",{className:"auth-glow"}),(0,t.jsxs)(r.default,{href:"/",className:"back-btn",children:[(0,t.jsx)("svg",{width:"15",height:"15",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",children:(0,t.jsx)("path",{d:"M19 12H5M12 5l-7 7 7 7"})}),"Back to Home"]}),(0,t.jsxs)("div",{className:"auth-card",children:[(0,t.jsx)("div",{className:"card-shimmer"}),(0,t.jsxs)("div",{className:"auth-logo",children:[(0,t.jsx)("div",{className:"logo-icon",children:"P"}),(0,t.jsx)("span",{className:"logo-name",children:"Patronex"})]}),(0,t.jsx)("h1",{className:"auth-title",children:"Create Account"}),(0,t.jsx)("p",{className:"auth-subtitle",children:"Join the Patronex community today"}),(0,t.jsxs)("div",{className:"social-grid",children:[(0,t.jsxs)("button",{className:"social-btn",type:"button",onClick:async()=>{try{await c.auth.authStateReady(),await (0,o.signInWithRedirect)(c.auth,c.googleProvider)}catch(e){j((0,d.formatAuthError)(e))}},children:[(0,t.jsxs)("svg",{className:"social-icon",viewBox:"0 0 24 24",children:[(0,t.jsx)("path",{fill:"#EA4335",d:"M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"}),(0,t.jsx)("path",{fill:"#34A853",d:"M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"}),(0,t.jsx)("path",{fill:"#FBBC05",d:"M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"}),(0,t.jsx)("path",{fill:"#4285F4",d:"M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"})]}),"Google"]}),(0,t.jsxs)("button",{className:"social-btn",type:"button",onClick:async()=>{try{await c.auth.authStateReady(),await (0,o.signInWithRedirect)(c.auth,c.githubProvider)}catch(e){j((0,d.formatAuthError)(e))}},children:[(0,t.jsx)("svg",{className:"social-icon",fill:"currentColor",viewBox:"0 0 24 24",children:(0,t.jsx)("path",{d:"M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"})}),"GitHub"]})]}),(0,t.jsxs)("div",{className:"divider",children:[(0,t.jsx)("span",{className:"divider-line"}),(0,t.jsx)("span",{className:"divider-text",children:"or sign up with email"}),(0,t.jsx)("span",{className:"divider-line"})]}),(0,t.jsxs)("div",{className:"role-section",children:[(0,t.jsx)("span",{className:"role-heading",children:"I am a..."}),(0,t.jsx)("div",{className:"role-grid",children:u.map(e=>(0,t.jsxs)("button",{type:"button",className:`role-btn${S===e.id?" active":""}`,onClick:()=>z(e.id),children:[(0,t.jsx)("span",{className:"role-icon",children:e.icon}),(0,t.jsx)("span",{className:"role-name",children:e.label}),(0,t.jsx)("span",{className:"role-desc",children:e.desc})]},e.id))})]}),(0,t.jsxs)("form",{className:"fields",onSubmit:async t=>{t.preventDefault(),k(!0),j("");try{let t=await (0,i.ab)(c.auth,b,m);t.user&&(await (0,l.al)(t.user,{displayName:`${p} ${f}`}),e.push("/dashboard"))}catch(e){j(e.message||"Failed to create account"),k(!1)}},children:[y&&(0,t.jsx)("p",{style:{color:"red",fontSize:"12px",textAlign:"center",margin:"0"},children:y}),(0,t.jsxs)("div",{className:"name-grid",children:[(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("label",{htmlFor:"firstName",className:"field-label",children:"First name"}),(0,t.jsx)("div",{className:`input-wrap${"firstName"===N?" focused":""}`,children:(0,t.jsx)("input",{id:"firstName",type:"text",placeholder:"John",className:"auth-input",value:p,onChange:e=>h(e.target.value),onFocus:()=>C("firstName"),onBlur:()=>C(null),disabled:w})})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("label",{htmlFor:"lastName",className:"field-label",children:"Last name"}),(0,t.jsx)("div",{className:`input-wrap${"lastName"===N?" focused":""}`,children:(0,t.jsx)("input",{id:"lastName",type:"text",placeholder:"Doe",className:"auth-input",value:f,onChange:e=>g(e.target.value),onFocus:()=>C("lastName"),onBlur:()=>C(null),disabled:w})})]})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("label",{htmlFor:"email",className:"field-label",children:"Email"}),(0,t.jsxs)("div",{className:`input-wrap${"email"===N?" focused":""}`,children:[(0,t.jsx)("svg",{className:"input-icon",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.5",children:(0,t.jsx)("path",{d:"M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"})}),(0,t.jsx)("input",{id:"email",type:"email",placeholder:"you@example.com",className:"auth-input",value:b,onChange:e=>x(e.target.value),onFocus:()=>C("email"),onBlur:()=>C(null),disabled:w})]})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("label",{htmlFor:"password",className:"field-label",children:"Password"}),(0,t.jsxs)("div",{className:`input-wrap${"password"===N?" focused":""}`,children:[(0,t.jsx)("svg",{className:"input-icon",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.5",children:(0,t.jsx)("path",{d:"M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"})}),(0,t.jsx)("input",{id:"password",type:"password",placeholder:"Create a strong password",className:"auth-input",value:m,onChange:e=>v(e.target.value),onFocus:()=>C("password"),onBlur:()=>C(null),disabled:w})]})]}),(0,t.jsxs)("div",{className:"terms-row",children:[(0,t.jsx)("input",{type:"checkbox",id:"terms",className:"auth-checkbox"}),(0,t.jsxs)("label",{htmlFor:"terms",className:"terms-label",children:["I agree to the"," ",(0,t.jsx)(r.default,{href:"#",className:"terms-link",children:"Terms of Service"})," ","and"," ",(0,t.jsx)(r.default,{href:"#",className:"terms-link",children:"Privacy Policy"})]})]}),(0,t.jsxs)("button",{type:"submit",className:"cta-btn",disabled:w,children:[(0,t.jsx)("span",{children:w?"Creating...":"Create Account"}),(0,t.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",children:(0,t.jsx)("path",{d:"M5 12h14M12 5l7 7-7 7"})})]})]}),(0,t.jsxs)("p",{className:"toggle-text",children:["Already have an account?"," ",(0,t.jsx)(r.default,{href:"/signin",className:"toggle-link",children:"Sign in"})]})]})]})]})}],56809)}]);