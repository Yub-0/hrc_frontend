import Dashboard from "../pages/dashboard/Dashboard";
import House from "../pages/house/House"
import Room from "../pages/room/Room"
import Rent from "../pages/rent/Rent"
import RentCategory from "../pages/rentcategory/RentCategory"

const routes = [
  {
    path: "/",
    component: () => import("pages/auth/pages/Login.vue"),
    name: "Login",
    meta: {
      checkLoggedIn: true
    }
  },
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/dashboard",
        name: "Dashboard",
        meta: {
          requiresAuth: true
        },
        component: Dashboard
      },{
        path: "/house",
        name: "House",
        meta: {
          requiresAuth: true
        },
        component: House
      },{
        path: "/room",
        name: "Room",
        meta: {
          requiresAuth: true
        },
        component: Room
      },{
        path: "/rent",
        name: "Rent",
        meta: {
          requiresAuth: true
        },
        component: Rent
      },{
        path: "/rentcategory",
        name: "RentCatgory",
        meta: {
          requiresAuth: true
        },
        component: RentCategory
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;

// const routes = [
//   {
//     path: '/',
//     component: Login,
//     name: 'Login',
//     meta: {
//       requiresAuth: false,
//       checkLoggedIn: true
//     }
//   },
//   {
//     path: '/register',
//     component: Register,
//     name: 'Register',
//     meta: {
//       requiresAuth: false,
//       checkLoggedIn: true
//     }
//   },
//   {
//     path: '/',
//     component: MainLayout,
//     name: 'Home',
//     meta: {
//       requiresAuth: true
//     },
//     children: [
//       {
//         path: '/dashboard',
//         name: 'Dashboard',
//         meta: {
//           requiresAuth: true
//         },
//         component: Dashboard
//       },
//       {
//         path: '/read',
//         component: ReadBooks,
//         name: 'ReadBooks',
//         meta: {
//           requiresAuth: false,
//           checkLoggedIn: false
//         },
//         children: [
//           {
//             path: ':bookId',
//             name: 'ReadBookView',
//             component: () => import('../pages/auth/ReadBooks.vue'),
//             meta: {
//               requiresAuth: true
//             }
//           }
//         ]

//       },

//       {
//         path: '/profile',
//         component: Profile,
//         name: 'Profile',
//         meta: {
//           requiresAuth: false,
//           checkLoggedIn: false
//         }
//       },
//       {
//         path: '/feedback',
//         component: Feedback,
//         name: 'Feedback',
//         meta: {
//           requiresAuth: false,
//           checkLoggedIn: false
//         }
//       },
//       {
//         path: '/feedback_view',
//         component: FeedbackView,
//         name: 'FeedbackView',
//         meta: {
//           requiresAuth: false,
//           checkLoggedIn: false
//         }
//       },
//       ...booksroute,
//       ...teacherroute,
//       ...studentroute
//     ]
//   },
//   Always leave this as last one,
//   but you can also remove it
//   {
//     path: '*',
//     component: () => import('pages/Error404.vue')
//   }
// ]

// export default routes
