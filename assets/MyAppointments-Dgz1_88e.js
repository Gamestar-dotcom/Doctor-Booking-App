import{r as l,k as C,l as S,y as c,j as e,b as L,L as A}from"./index-BkgykYix.js";import{a as M,c as I}from"./appointmentAPi-0ik28xsb.js";const z=({isOpen:j,onClose:r,appointmentDetails:o,onSubmit:g})=>{const[a,y]=l.useState(""),[x,N]=l.useState((o==null?void 0:o.fee)||""),[t,m]=l.useState(""),[f,h]=l.useState(null),[i,b]=l.useState("initiate"),[v,{isLoading:w}]=C(),{data:u}=S(f,{skip:!f,pollingInterval:5e3});l.useEffect(()=>{var d;u&&(u.status==="Completed"?(b("completed"),c.success("Payment completed successfully!"),setTimeout(()=>{g(),r()},2e3)):u.status==="Failed"&&(b("failed"),m(((d=u.paymentRequest)==null?void 0:d.failure_reason)||"Payment failed. Please try again.")))},[u,g,r]);const P=async d=>{var n;if(d.preventDefault(),m(""),!a||a.length<10){m("Please enter a valid phone number");return}let s=a;!a.startsWith("254")&&a.startsWith("0")?s="254"+a.substring(1):a.startsWith("254")||(s="254"+a);try{const p=await v({phoneNumber:s,amount:x}).unwrap();if(p.CheckoutRequestID)h(p.CheckoutRequestID),b("pending"),c.info("Payment initiated. Please check your phone.");else throw new Error("Invalid response from server.")}catch(p){m(((n=p.data)==null?void 0:n.message)||"Payment initiation failed. Please try again."),c.error(t||"Payment initiation failed")}},k=()=>{b("initiate"),h(null),m("")};return j?e.jsx("div",{className:"fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50",children:e.jsxs("div",{className:"bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4",children:[e.jsxs("div",{className:"flex justify-between items-center mb-4",children:[e.jsx("h3",{className:"text-lg font-semibold text-gray-900",children:"M-Pesa Payment"}),e.jsx("button",{onClick:r,className:"text-gray-400 hover:text-gray-500",children:e.jsx("svg",{className:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M6 18L18 6M6 6l12 12"})})})]}),e.jsxs("div",{className:"mb-6 text-center",children:[e.jsx("div",{className:"flex justify-center mb-4",children:e.jsx("svg",{className:"h-12 w-auto text-green-600",viewBox:"0 0 24 24",fill:"currentColor",children:e.jsx("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h10v2H7v-2z"})})}),i==="initiate"&&e.jsxs(e.Fragment,{children:[e.jsx("p",{className:"text-sm text-gray-600 mb-2",children:"You will receive an M-Pesa STK push notification on your phone."}),e.jsx("p",{className:"text-sm text-gray-600",children:"Please enter your PIN when prompted to complete the payment."})]}),i==="pending"&&e.jsxs("div",{className:"text-center",children:[e.jsx("div",{className:"flex justify-center mb-3",children:e.jsxs("svg",{className:"animate-spin h-10 w-10 text-green-500",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",children:[e.jsx("circle",{className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4"}),e.jsx("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"})]})}),e.jsx("p",{className:"font-medium text-gray-800 mb-2",children:"Waiting for payment confirmation"}),e.jsx("p",{className:"text-sm text-gray-600",children:"Please check your phone and enter your M-Pesa PIN to complete the payment"})]}),i==="completed"&&e.jsxs("div",{className:"text-center",children:[e.jsx("div",{className:"flex justify-center mb-3",children:e.jsx("svg",{className:"h-12 w-12 text-green-500",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M5 13l4 4L19 7"})})}),e.jsx("p",{className:"font-medium text-green-600 mb-2",children:"Payment Successful!"}),e.jsx("p",{className:"text-sm text-gray-600",children:"Your payment has been processed successfully."})]}),i==="failed"&&e.jsxs("div",{className:"text-center",children:[e.jsx("div",{className:"flex justify-center mb-3",children:e.jsx("svg",{className:"h-12 w-12 text-red-500",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M6 18L18 6M6 6l12 12"})})}),e.jsx("p",{className:"font-medium text-red-600 mb-2",children:"Payment Failed"}),e.jsx("p",{className:"text-sm text-gray-600",children:"We couldn't process your payment. Please try again."})]})]}),t&&e.jsx("div",{className:"mb-4 p-2 bg-red-50 border border-red-100 text-red-700 text-sm rounded",children:t}),i==="initiate"&&e.jsxs("form",{onSubmit:P,children:[e.jsxs("div",{className:"mb-4",children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Phone Number"}),e.jsx("input",{type:"tel",placeholder:"e.g. 0712345678",className:"w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500",value:a,onChange:d=>y(d.target.value),required:!0}),e.jsx("p",{className:"mt-1 text-xs text-gray-500",children:"Enter the phone number registered with M-Pesa"})]}),e.jsxs("div",{className:"mb-6",children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Amount (KES)"}),e.jsx("input",{type:"number",className:"w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-gray-50",value:x,readOnly:!0})]}),e.jsxs("div",{className:"flex justify-end space-x-3",children:[e.jsx("button",{type:"button",onClick:r,className:"px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50",children:"Cancel"}),e.jsx("button",{type:"submit",className:"px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50",disabled:w,children:w?e.jsxs("span",{className:"flex items-center",children:[e.jsxs("svg",{className:"animate-spin -ml-1 mr-2 h-4 w-4 text-white",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",children:[e.jsx("circle",{className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4"}),e.jsx("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"})]}),"Processing..."]}):"Pay Now"})]})]}),i==="pending"&&e.jsx("div",{className:"flex justify-center mt-4",children:e.jsx("button",{onClick:r,className:"px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50",children:"Check Later"})}),i==="failed"&&e.jsxs("div",{className:"flex justify-center space-x-3 mt-4",children:[e.jsx("button",{onClick:k,className:"px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500",children:"Try Again"}),e.jsx("button",{onClick:r,className:"px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50",children:"Cancel"})]})]})}):null},T=()=>{const{isAuthenticated:j,user:r}=L(s=>s.auth),[o,g]=l.useState("upcoming"),[a,y]=l.useState(!1),[x,N]=l.useState(null),{data:t,isLoading:m,error:f,refetch:h}=M();l.useEffect(()=>{h()},[t,h]);const[i,{isLoading:b}]=I(),[v,{isLoading:w}]=C(),u=async s=>{const n=Number(s);if(isNaN(n)){console.error("Invalid appointment ID:",s),c.error("Failed to cancel appointment. Invalid ID.");return}try{await i(n).unwrap(),c.success("Appointment cancelled successfully!")}catch(p){console.error("Error cancelling appointment:",p),c.error("Failed to cancel appointment. Please try again.")}},P=s=>{N(s),y(!0)},k=async s=>{try{(await v(s).unwrap()).ResponseCode==="0"?(c.success("Payment initiated successfully!"),d()):c.error("Failed to initiate payment. Please try again.")}catch(n){console.error("Error initiating payment:",n),c.error("Failed to initiate payment. Please try again.")}},d=()=>{y(!1),N(null),h()};return!j||(r==null?void 0:r.role)!=="patient"?e.jsxs("div",{className:"flex flex-col items-center justify-center h-64 bg-gray-50 rounded-lg shadow-sm",children:[e.jsx("p",{className:"text-lg text-gray-700 mb-4",children:"You must be logged in as a patient to view your appointments."}),e.jsx(A,{to:"/login",className:"px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50",children:"Login"})]}):m?e.jsx("div",{className:"flex items-center justify-center h-64",children:e.jsxs("div",{className:"animate-pulse flex space-x-2",children:[e.jsx("div",{className:"h-3 w-3 bg-blue-600 rounded-full"}),e.jsx("div",{className:"h-3 w-3 bg-blue-600 rounded-full"}),e.jsx("div",{className:"h-3 w-3 bg-blue-600 rounded-full"})]})}):f?e.jsx("div",{className:"bg-red-50 border-l-4 border-red-500 p-4 my-4 rounded shadow-sm",children:e.jsxs("div",{className:"flex",children:[e.jsx("div",{className:"flex-shrink-0",children:e.jsx("svg",{className:"h-5 w-5 text-red-400",viewBox:"0 0 20 20",fill:"currentColor",children:e.jsx("path",{fillRule:"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z",clipRule:"evenodd"})})}),e.jsx("div",{className:"ml-3",children:e.jsx("p",{className:"text-sm text-red-700",children:"Failed to load appointments."})})]})}):e.jsxs("div",{className:"container mx-auto px-4 py-8",children:[e.jsxs("div",{className:"flex space-x-4 border-b border-gray-200 mb-6",children:[e.jsx("button",{onClick:()=>g("upcoming"),className:`pb-2 ${o==="upcoming"?"border-b-2 border-blue-600 text-blue-600 font-medium":"text-gray-500"}`,children:"Upcoming Appointments"}),e.jsx("button",{onClick:()=>g("past"),className:`pb-2 ${o==="past"?"border-b-2 border-blue-600 text-blue-600 font-medium":"text-gray-500"}`,children:"Past Appointments"})]}),e.jsxs("div",{children:[o==="upcoming"&&e.jsx("div",{children:t&&Array.isArray(t)&&t.length>0?t.map(s=>e.jsxs("div",{className:"bg-white shadow-md rounded-lg p-4 mb-4",children:[e.jsx("h3",{className:"text-lg font-medium",children:s.title}),e.jsxs("p",{className:"text-gray-600 mt-2",children:["Date: ",new Date(s.date).toLocaleDateString()]}),e.jsxs("p",{className:"text-gray-600",children:["Time: ",new Date(s.date).toLocaleTimeString()]}),e.jsxs("p",{className:"text-gray-600",children:["Status:"," ",e.jsx("span",{className:`${s.status==="pending"?"text-yellow-600":"text-green-600"} font-medium`,children:s.status.charAt(0).toUpperCase()+s.status.slice(1)})]}),s.status==="pending"&&e.jsxs("div",{className:"mt-4 flex space-x-4",children:[e.jsx("button",{onClick:()=>P(s),className:"px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors",children:"Pay Now"}),e.jsx("button",{onClick:()=>u(s.id),className:"px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors",children:"Cancel"})]})]},s.id)):e.jsx("p",{children:"No upcoming appointments found."})}),o==="past"&&e.jsx("div",{children:t&&Array.isArray(t)&&t.length>0?t.map(s=>e.jsxs("div",{className:"bg-white shadow-md rounded-lg p-4 mb-4",children:[e.jsx("h3",{className:"text-lg font-medium",children:s.title}),e.jsxs("p",{className:"text-gray-600 mt-2",children:["Date: ",new Date(s.date).toLocaleDateString()]}),e.jsxs("p",{className:"text-gray-600",children:["Time: ",new Date(s.date).toLocaleTimeString()]}),e.jsxs("p",{className:"text-gray-600",children:["Status:"," ",e.jsx("span",{className:`${s.status==="completed"?"text-green-600":"text-red-600"} font-medium`,children:s.status.charAt(0).toUpperCase()+s.status.slice(1)})]})]},s.id)):e.jsx("p",{children:"No past appointments found."})})]}),a&&x&&e.jsx(z,{isOpen:a,onClose:()=>y(!1),onSubmit:s=>{const n={phoneNumber:s,amount:x.amount};k(n)},amount:x.amount})]})};export{T as default};
