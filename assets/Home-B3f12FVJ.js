import{b as x,j as e,L as i}from"./index-e6Oqq3iG.js";import{u as m}from"./doctorApi-gwhK1GVA.js";const p=()=>{const{isAuthenticated:n,user:s}=x(a=>a.auth),{data:r,isLoading:c,error:d}=m(),o=r==null?void 0:r.slice(0,4),t=(s==null?void 0:s.role)||"guest",l={admin:{welcomeTitle:"Welcome, Administrator",welcomeMessage:"Manage your healthcare platform with ease. Access all system controls from your dashboard.",primaryCTA:{text:"Admin Dashboard",link:"/admin/dashboard"},secondaryCTA:{text:"View All Doctors",link:"/admin/doctors"}},doctor:{welcomeTitle:"Welcome, Doctor",welcomeMessage:"Your patients are waiting. Check your schedule and manage appointments with ease.",primaryCTA:{text:"Your Dashboard",link:`/doctor/dashboard/${s==null?void 0:s.doctorId}`},secondaryCTA:{text:"Check Appointments",link:"/appointments"}},patient:{welcomeTitle:"Your Health, Our Priority",welcomeMessage:"Connect with top specialists and take control of your health journey.",primaryCTA:{text:"Your Appointments",link:"/appointments"},secondaryCTA:{text:"Book Appointment",link:"/doctors"}},guest:{welcomeTitle:"Your Health, Our Priority",welcomeMessage:"MediConnect helps you access quality healthcare with a simple booking system that connects you with qualified doctors across specialties.",primaryCTA:{text:"Login",link:"/login"},secondaryCTA:{text:"Register Now",link:"/register"}}}[t==="user"?"patient":t];return e.jsxs("div",{className:"bg-gray-50 min-h-screen",children:[e.jsxs("section",{className:"relative h-[600px] overflow-hidden",children:[e.jsxs("div",{className:"absolute inset-0 z-0",children:[e.jsx("img",{src:"/Doctor-Booking-App/herobg.png",alt:"Healthcare Background",className:"w-full h-full object-cover"}),e.jsx("div",{className:`absolute inset-0 bg-gradient-to-r ${t==="admin"?"from-indigo-900/90 to-purple-900/90":t==="doctor"?"from-green-900/90 to-blue-900/90":"from-blue-900/90 to-indigo-900/90"} mix-blend-multiply`})]}),e.jsxs("div",{className:"relative z-10 max-w-6xl mx-auto px-6 h-full flex flex-col justify-center",children:[e.jsxs("div",{className:"max-w-3xl",children:[e.jsx("div",{className:`h-1 w-24 mb-8 ${t==="admin"?"bg-purple-400":t==="doctor"?"bg-green-400":"bg-blue-400"}`}),e.jsx("h1",{className:"text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6",children:l.welcomeTitle}),e.jsx("p",{className:"text-xl md:text-2xl text-blue-100 font-light mb-12 max-w-2xl",children:l.welcomeMessage}),n&&e.jsx("div",{className:"flex flex-col sm:flex-row gap-4",children:e.jsxs(i,{to:l.primaryCTA.link,className:`inline-flex items-center px-8 py-4 rounded-lg text-lg font-medium transition-all shadow-lg ${t==="admin"?"bg-purple-500 hover:bg-purple-600":t==="doctor"?"bg-green-500 hover:bg-green-600":"bg-blue-500 hover:bg-blue-600"} text-white`,children:[l.primaryCTA.text,e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-5 w-5 ml-2",viewBox:"0 0 20 20",fill:"currentColor",children:e.jsx("path",{fillRule:"evenodd",d:"M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z",clipRule:"evenodd"})})]})})]}),n&&s&&e.jsx("div",{className:"absolute bottom-8 right-8 md:bottom-12 md:right-12",children:e.jsxs("div",{className:`flex items-center space-x-3 py-3 px-5 rounded-full backdrop-blur-md ${t==="admin"?"bg-indigo-500/20 text-indigo-100":t==="doctor"?"bg-green-500/20 text-green-100":"bg-blue-500/20 text-blue-100"}`,children:[e.jsx("div",{className:`h-10 w-10 rounded-full flex items-center justify-center ${t==="admin"?"bg-indigo-400":t==="doctor"?"bg-green-400":"bg-blue-400"}`,children:s.name.charAt(0).toUpperCase()}),e.jsxs("div",{children:[e.jsxs("p",{className:"text-white font-medium",children:["Welcome, ",s.name]}),e.jsx("p",{className:"text-sm opacity-80",children:t==="doctor"?"Your patients are waiting":t==="admin"?"Access your admin controls":"Your health journey continues here"})]})]})})]})]}),e.jsx("section",{className:"py-16 bg-white",children:e.jsxs("div",{className:"max-w-6xl mx-auto px-4",children:[e.jsx("h2",{className:"text-3xl font-bold text-center mb-16 text-gray-800",children:t==="doctor"?"How Your MediConnect Portal Works":t==="admin"?"How MediConnect Administration Works":"How MediConnect Works"}),e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-8",children:t==="doctor"?e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"flex flex-col items-center",children:[e.jsx("div",{className:"bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mb-6",children:e.jsx("span",{className:"text-green-600 text-xl font-bold",children:"1"})}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 mb-4",children:"Update Your Profile"}),e.jsx("p",{className:"text-gray-600 text-center",children:"Keep your information up to date so patients can find the right care."})]}),e.jsxs("div",{className:"flex flex-col items-center",children:[e.jsx("div",{className:"bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mb-6",children:e.jsx("span",{className:"text-green-600 text-xl font-bold",children:"2"})}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 mb-4",children:"Manage Appointments"}),e.jsx("p",{className:"text-gray-600 text-center",children:"Easily view and manage your upcoming appointments with patients."})]}),e.jsxs("div",{className:"flex flex-col items-center",children:[e.jsx("div",{className:"bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mb-6",children:e.jsx("span",{className:"text-green-600 text-xl font-bold",children:"3"})}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 mb-4",children:"Provide Care"}),e.jsx("p",{className:"text-gray-600 text-center",children:"Deliver quality healthcare to your patients and build your practice."})]})]}):t==="admin"?e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"flex flex-col items-center",children:[e.jsx("div",{className:"bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mb-6",children:e.jsx("span",{className:"text-indigo-600 text-xl font-bold",children:"1"})}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 mb-4",children:"Manage Users"}),e.jsx("p",{className:"text-gray-600 text-center",children:"Oversee patient and doctor accounts with advanced administrative tools."})]}),e.jsxs("div",{className:"flex flex-col items-center",children:[e.jsx("div",{className:"bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mb-6",children:e.jsx("span",{className:"text-indigo-600 text-xl font-bold",children:"2"})}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 mb-4",children:"Monitor System"}),e.jsx("p",{className:"text-gray-600 text-center",children:"Keep track of appointments, user activity, and platform performance."})]}),e.jsxs("div",{className:"flex flex-col items-center",children:[e.jsx("div",{className:"bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mb-6",children:e.jsx("span",{className:"text-indigo-600 text-xl font-bold",children:"3"})}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 mb-4",children:"System Management"}),e.jsx("p",{className:"text-gray-600 text-center",children:"Configure platform settings and ensure smooth operations."})]})]}):e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"flex flex-col items-center",children:[e.jsx("div",{className:"bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mb-6",children:e.jsx("span",{className:"text-blue-600 text-xl font-bold",children:"1"})}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 mb-4",children:"Find a Doctor"}),e.jsx("p",{className:"text-gray-600 text-center",children:"Browse our network of certified specialists and choose the one that meets your needs."})]}),e.jsxs("div",{className:"flex flex-col items-center",children:[e.jsx("div",{className:"bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mb-6",children:e.jsx("span",{className:"text-blue-600 text-xl font-bold",children:"2"})}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 mb-4",children:"Book Appointment"}),e.jsx("p",{className:"text-gray-600 text-center",children:"Select a convenient time slot and instantly book your appointment online."})]}),e.jsxs("div",{className:"flex flex-col items-center",children:[e.jsx("div",{className:"bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mb-6",children:e.jsx("span",{className:"text-blue-600 text-xl font-bold",children:"3"})}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 mb-4",children:"Get Care"}),e.jsx("p",{className:"text-gray-600 text-center",children:"Visit your doctor at the scheduled time and receive quality healthcare services."})]})]})})]})}),e.jsx("section",{className:"py-16 bg-gray-50",children:e.jsxs("div",{className:"max-w-6xl mx-auto px-4",children:[e.jsx("h2",{className:"text-3xl font-bold text-center mb-16 text-gray-800",children:t==="doctor"?"Why Doctors Choose MediConnect":t==="admin"?"MediConnect Admin Features":"Why Choose MediConnect?"}),e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-8",children:t==="doctor"?e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border-t-4 border-green-500",children:[e.jsx("h3",{className:"text-xl font-semibold text-gray-800 mb-4",children:"Grow Your Practice"}),e.jsx("p",{className:"text-gray-600",children:"Expand your patient base and increase visibility with our platform's exposure to thousands of potential patients."})]}),e.jsxs("div",{className:"bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border-t-4 border-blue-500",children:[e.jsx("h3",{className:"text-xl font-semibold text-gray-800 mb-4",children:"Streamlined Scheduling"}),e.jsx("p",{className:"text-gray-600",children:"Reduce no-shows and manage your calendar efficiently with our automated appointment system."})]}),e.jsxs("div",{className:"bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border-t-4 border-purple-500",children:[e.jsx("h3",{className:"text-xl font-semibold text-gray-800 mb-4",children:"Professional Network"}),e.jsx("p",{className:"text-gray-600",children:"Connect with other healthcare professionals and build your reputation in our verified specialist community."})]})]}):t==="admin"?e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border-t-4 border-indigo-500",children:[e.jsx("h3",{className:"text-xl font-semibold text-gray-800 mb-4",children:"Comprehensive Dashboard"}),e.jsx("p",{className:"text-gray-600",children:"Get real-time insights into platform metrics, user activity, and system performance all in one place."})]}),e.jsxs("div",{className:"bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border-t-4 border-purple-500",children:[e.jsx("h3",{className:"text-xl font-semibold text-gray-800 mb-4",children:"User Management"}),e.jsx("p",{className:"text-gray-600",children:"Easily manage doctor verifications, patient accounts, and role permissions with advanced administrative tools."})]}),e.jsxs("div",{className:"bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border-t-4 border-blue-500",children:[e.jsx("h3",{className:"text-xl font-semibold text-gray-800 mb-4",children:"System Configuration"}),e.jsx("p",{className:"text-gray-600",children:"Configure platform settings, manage integrations, and ensure smooth operations with our comprehensive system tools."})]})]}):e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border-t-4 border-blue-500",children:[e.jsx("h3",{className:"text-xl font-semibold text-gray-800 mb-4",children:"Easy Booking"}),e.jsx("p",{className:"text-gray-600",children:"Book appointments with top doctors in just a few clicks. No more waiting on hold or dealing with complicated scheduling systems."})]}),e.jsxs("div",{className:"bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border-t-4 border-green-500",children:[e.jsx("h3",{className:"text-xl font-semibold text-gray-800 mb-4",children:"Verified Doctors"}),e.jsx("p",{className:"text-gray-600",children:"All doctors on our platform are thoroughly vetted and verified to ensure you receive the highest quality care."})]}),e.jsxs("div",{className:"bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border-t-4 border-purple-500",children:[e.jsx("h3",{className:"text-xl font-semibold text-gray-800 mb-4",children:"Secure & Private"}),e.jsx("p",{className:"text-gray-600",children:"Your health information is safe with us. We use the latest encryption technologies to protect your data."})]})]})})]})}),t==="patient"||t==="guest"?e.jsx("section",{className:"py-16 bg-white",children:e.jsxs("div",{className:"max-w-6xl mx-auto px-4",children:[e.jsx("h2",{className:"text-3xl font-bold text-center mb-16 text-gray-800",children:"Meet Our Featured Doctors"}),c?e.jsx("div",{className:"text-center",children:"Loading doctors..."}):d?e.jsxs("div",{className:"text-center text-red-600",children:["Error loading doctors: ",d.message]}):e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8",children:o==null?void 0:o.map(a=>e.jsxs("div",{className:"bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300",children:[e.jsx("img",{src:a.image||"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmRLRMXynnc7D6-xfdpeaoEUeon2FaU0XtPg&s",alt:a.name,className:"w-full h-48 object-fit rounded-t-xl"}),e.jsxs("div",{className:"p-6",children:[e.jsx("h3",{className:"text-xl font-semibold text-gray-800 mb-2",children:a.name}),e.jsx("p",{className:"text-gray-600 mb-4",children:a.specialization}),e.jsx(i,{to:`/doctors/${a.id}`,className:"text-blue-600 hover:text-blue-800 font-semibold",children:"View Profile →"})]})]},a.id))})]})}):null,e.jsx("section",{className:"bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16",children:e.jsxs("div",{className:"max-w-6xl mx-auto px-4 text-center",children:[e.jsx("h2",{className:"text-3xl font-bold mb-6",children:t==="doctor"?"Ready to Grow Your Practice?":t==="admin"?"Manage Your Platform with Ease":"Start Your Health Journey Today"}),e.jsx("p",{className:"text-xl mb-8",children:t==="doctor"?"Join thousands of doctors who trust MediConnect to manage their practice.":t==="admin"?"Access powerful tools to manage your healthcare platform.":"Connect with top doctors and take control of your health."}),e.jsx(i,{to:l.primaryCTA.link,className:"bg-white text-blue-700 py-3 px-8 rounded-full hover:bg-blue-50 transition duration-300 font-semibold text-lg shadow-lg",children:l.primaryCTA.text})]})})]})};export{p as default};
