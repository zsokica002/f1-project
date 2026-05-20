// import { Link, useLocation } from "react-router";
// import { Breadcrumb, Divider } from "antd";
// import BreadcrumbItem from "antd/es/breadcrumb/BreadcrumbItem";

// export default function Breadcrumbs () {
//     const location = useLocation();
//     const breadcrumbShow = () => {
//         const pathName = location;
//         const pathNames = pathName.split("/").filter((item) => item);
//     }
//     return (
//         <Breadcrumb>
//             {pathNames > 0 ? (<BreadcrumbItem>
//                 <Link to="/">
//                 Home
//                 </Link>
//             </BreadcrumbItem>) : (
//                 <BreadcrumbItem>
//                     Home
//                 </BreadcrumbItem>)}
                
//                 {pathNames.map((name, i)=>{
//                     const routTo = `/${pathNames.slice(0, i+1).join("/")}`;
//                     const last = i ===pathNames.length-1;
//                 })}
//         </Breadcrumb>
//     );
// }
