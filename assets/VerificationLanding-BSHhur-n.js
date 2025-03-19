import{r as i,j as e,L as h,y as l}from"./index-CvvQ2XX2.js";const f=()=>{const[r,c]=i.useState(""),[n,a]=i.useState(!1),[d,o]=i.useState(30);i.useEffect(()=>{const s=localStorage.getItem("user");if(s){const t=JSON.parse(s);c(t.email||"your email")}},[]);const m=async()=>{if(!r)return;a(!0),o(30);try{const t=await fetch("http://localhost:5000/api/auth/resend-verification",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:r})}),u=await t.json();t.ok?l.success("Verification email resent successfully!"):l.error(u.message||"Failed to resend verification email.")}catch(t){console.error("Error resending verification email:",t),alert("An error occurred while resending the verification email.")}const s=setInterval(()=>{o(t=>t<=1?(clearInterval(s),a(!1),30):t-1)},1e3)};return e.jsx("div",{className:"min-h-screen flex items-center justify-center",children:e.jsxs("div",{className:"bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center",children:[e.jsx("h1",{className:"text-2xl font-bold mb-4",children:"Email Verification Required"}),e.jsx("div",{className:"text-center mb-6",children:e.jsx("div",{className:"mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4",children:e.jsx("svg",{className:"h-6 w-6 text-blue-600",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"})})})}),e.jsxs("p",{className:"mb-4",children:["We've sent a verification link to ",e.jsx("strong",{children:r})]}),e.jsx("p",{className:"mb-6 text-gray-600",children:"Please check your inbox and click the verification link to complete your registration."}),e.jsxs("div",{className:"mb-4",children:[e.jsx("p",{className:"text-sm text-gray-500",children:"Didn't receive an email?"}),e.jsx("button",{className:"text-sm text-blue-600 hover:underline disabled:opacity-50",disabled:n,onClick:m,children:n?`Resend in ${d}s`:"Resend Verification"})]}),e.jsx(h,{to:"/login",className:"inline-block mt-4 text-gray-500 hover:text-gray-700",children:"Return to Login"})]})})};export{f as default};
