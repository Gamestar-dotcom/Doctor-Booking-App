import{r as v,u as k,a as S,b as A,j as e,L as B,s as i,c as L,d as g,y as b}from"./index-CI9t_SLd.js";import{a as H}from"./authApi-CcvfOSY_.js";const F=()=>{const[o,c]=v.useState({name:"",email:"",password:"",confirmPassword:"",role:"patient"}),[d,y]=v.useState(!1),[m,N]=v.useState(!1),{name:x,email:u,password:n,confirmPassword:h,role:l}=o,r=k(),z=S(),{error:f}=A(a=>a.auth),[C,{isLoading:w}]=H(),t=a=>{c({...o,[a.target.name]:a.target.value})},M=async a=>{var j;if(a.preventDefault(),r(i(!0)),r(L()),!x||!u||!n||!h||!l){r(g("All fields are required.")),r(i(!1));return}if(h!==n){r(g("Passwords do not match.")),r(i(!1));return}try{const s=await C({name:x,email:u,password:n,role:l}).unwrap();if(!(s!=null&&s.user))throw new Error("User data is missing in the response.");localStorage.setItem("token",s.token),localStorage.setItem("user",JSON.stringify(s.user)),b.success("Registered successfully!"),z("/verification-pending")}catch(s){console.error("Error Registering: ",s);let p="Error Registering. Please try again.";(j=s==null?void 0:s.data)!=null&&j.message&&(p=s.data.message),r(g(p)),b.error(p)}finally{r(i(!1))}},R=()=>{y(!d)},P=()=>{N(!m)};return e.jsx("div",{className:" mt-5 flex items-center justify-center min-h-screen",children:e.jsxs("div",{className:"w-full max-w-md px-8 py-10 bg-white rounded-xl shadow-lg",children:[e.jsxs("div",{className:"mb-6 text-center",children:[e.jsx("h1",{className:"text-3xl font-bold text-gray-800",children:"Create Account"}),e.jsx("p",{className:"mt-2 text-gray-600",children:"Join our healthcare platform"})]}),f&&e.jsx("div",{className:"mb-6 px-4 py-3 bg-red-50 border-l-4 border-red-500 rounded-md",children:e.jsxs("div",{className:"flex items-center",children:[e.jsx("svg",{className:"h-5 w-5 text-red-500 mr-2",fill:"currentColor",viewBox:"0 0 20 20",children:e.jsx("path",{fillRule:"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z",clipRule:"evenodd"})}),e.jsx("p",{className:"text-sm text-red-700",children:f})]})}),e.jsxs("form",{onSubmit:M,className:"space-y-4",children:[e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",htmlFor:"name",children:"Full Name"}),e.jsxs("div",{className:"relative",children:[e.jsx("div",{className:"absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",children:e.jsx("svg",{className:"h-5 w-5 text-gray-400",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor",children:e.jsx("path",{fillRule:"evenodd",d:"M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z",clipRule:"evenodd"})})}),e.jsx("input",{type:"text",id:"name",name:"name",value:x,onChange:t,className:"pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",placeholder:"John Doe",required:!0})]})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",htmlFor:"email",children:"Email Address"}),e.jsxs("div",{className:"relative",children:[e.jsx("div",{className:"absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",children:e.jsxs("svg",{className:"h-5 w-5 text-gray-400",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor",children:[e.jsx("path",{d:"M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"}),e.jsx("path",{d:"M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"})]})}),e.jsx("input",{type:"email",id:"email",name:"email",value:u,onChange:t,className:"pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",placeholder:"you@example.com",required:!0})]})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",htmlFor:"password",children:"Password"}),e.jsxs("div",{className:"relative",children:[e.jsx("div",{className:"absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",children:e.jsx("svg",{className:"h-5 w-5 text-gray-400",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor",children:e.jsx("path",{fillRule:"evenodd",d:"M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z",clipRule:"evenodd"})})}),e.jsx("input",{type:d?"text":"password",id:"password",name:"password",value:n,onChange:t,className:"pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",placeholder:"••••••••",required:!0}),e.jsx("div",{className:"absolute inset-y-0 right-0 pr-3 flex items-center",children:e.jsx("button",{type:"button",onClick:R,className:"text-gray-400 hover:text-gray-600 focus:outline-none",children:d?e.jsxs("svg",{className:"h-5 w-5",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor",children:[e.jsx("path",{d:"M10 12a2 2 0 100-4 2 2 0 000 4z"}),e.jsx("path",{fillRule:"evenodd",d:"M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z",clipRule:"evenodd"})]}):e.jsxs("svg",{className:"h-5 w-5",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor",children:[e.jsx("path",{fillRule:"evenodd",d:"M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z",clipRule:"evenodd"}),e.jsx("path",{d:"M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z"})]})})})]}),e.jsx("p",{className:"mt-1 text-xs text-gray-500",children:"Must be at least 8 characters"})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",htmlFor:"confirmPassword",children:"Confirm Password"}),e.jsxs("div",{className:"relative",children:[e.jsx("div",{className:"absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",children:e.jsx("svg",{className:"h-5 w-5 text-gray-400",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor",children:e.jsx("path",{fillRule:"evenodd",d:"M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z",clipRule:"evenodd"})})}),e.jsx("input",{type:m?"text":"password",id:"confirmPassword",name:"confirmPassword",value:h,onChange:t,className:"pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",placeholder:"••••••••",required:!0}),e.jsx("div",{className:"absolute inset-y-0 right-0 pr-3 flex items-center",children:e.jsx("button",{type:"button",onClick:P,className:"text-gray-400 hover:text-gray-600 focus:outline-none",children:m?e.jsxs("svg",{className:"h-5 w-5",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor",children:[e.jsx("path",{d:"M10 12a2 2 0 100-4 2 2 0 000 4z"}),e.jsx("path",{fillRule:"evenodd",d:"M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z",clipRule:"evenodd"})]}):e.jsxs("svg",{className:"h-5 w-5",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor",children:[e.jsx("path",{fillRule:"evenodd",d:"M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z",clipRule:"evenodd"}),e.jsx("path",{d:"M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z"})]})})})]})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",htmlFor:"role",children:"I am a"}),e.jsxs("div",{className:"flex space-x-4",children:[e.jsxs("div",{className:`flex-1 flex items-center justify-center p-3 border rounded-lg cursor-pointer ${l==="patient"?"border-blue-500 bg-blue-50 text-blue-700":"border-gray-300 hover:border-gray-400"}`,onClick:()=>c({...o,role:"patient"}),children:[e.jsxs("div",{className:"text-center",children:[e.jsx("svg",{className:"h-6 w-6 mx-auto mb-1",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor",children:e.jsx("path",{d:"M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"})}),e.jsx("span",{className:"font-medium",children:"Patient"})]}),e.jsx("input",{type:"radio",id:"patient",name:"role",value:"patient",checked:l==="patient",onChange:t,className:"sr-only"})]}),e.jsxs("div",{className:`flex-1 flex items-center justify-center p-3 border rounded-lg cursor-pointer ${l==="doctor"?"border-blue-500 bg-blue-50 text-blue-700":"border-gray-300 hover:border-gray-400"}`,onClick:()=>c({...o,role:"doctor"}),children:[e.jsxs("div",{className:"text-center",children:[e.jsx("svg",{className:"h-6 w-6 mx-auto mb-1",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor",children:e.jsx("path",{fillRule:"evenodd",d:"M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4zm3 1h6v4H7V5zm8 8v2h1v1H4v-1h1v-2H4v-1h16v1h-1z",clipRule:"evenodd"})}),e.jsx("span",{className:"font-medium",children:"Doctor"})]}),e.jsx("input",{type:"radio",id:"doctor",name:"role",value:"doctor",checked:l==="doctor",onChange:t,className:"sr-only"})]})]})]}),e.jsx("div",{className:"pt-2",children:e.jsx("button",{type:"submit",className:"w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150",disabled:w,children:w?e.jsxs("span",{className:"flex items-center",children:[e.jsxs("svg",{className:"animate-spin -ml-1 mr-2 h-4 w-4 text-white",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",children:[e.jsx("circle",{className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4"}),e.jsx("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"})]}),"Creating Account..."]}):"Create Account"})})]}),e.jsx("div",{className:"mt-8 text-center",children:e.jsxs("p",{className:"text-sm text-gray-600",children:["Already have an account?"," ",e.jsx(B,{to:"/login",className:"font-medium text-blue-600 hover:text-blue-500",children:"Sign in"})]})}),e.jsx("div",{className:"mt-6 border-t border-gray-200 pt-6",children:e.jsxs("p",{className:"text-xs text-center text-gray-500",children:["By creating an account, you agree to our"," ",e.jsx("a",{href:"#",className:"text-blue-600 hover:underline",children:"Terms of Service"})," ","and"," ",e.jsx("a",{href:"#",className:"text-blue-600 hover:underline",children:"Privacy Policy"})]})})]})})};export{F as default};
