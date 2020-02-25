export const navigation = [
  {
    id: 'applications',
    title: 'Main Menu',
    type: 'group',
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'item',
        icon: 'dashboard',
        url: '/dashboard/main'
      }
    ]
  },
  {
    id: 'projectManager',
    title: 'Task Manager',
    type: 'group',
    children: [
 
      {
        id: 'scrumboard',
        title: 'Scrumboard',
        type: 'item',
        icon: 'art_track',
        url: '/project-board'
      },
      {
        id: 'projects',
        title: 'Projects',
        type: 'collapse',
        icon: 'check_box',
        children: [
          {
            id: 'projectsList',
            title: 'Projects',
            type: 'item',
            icon: 'check_box',
            url: '/projects/projects'
          },
          {
            id: 'subProjectsList',
            title: 'sub Projects',
            type: 'item',
            icon: 'filter_none',
            url: '/projects/subProjects'
          },
          {
            id: 'projectMessages',
            title: 'Messages',
            type: 'item',
            icon: 'email',
            url: '/projects/list'
          },
          //  {
          //   id: 'projectTimesheet',
          //   title: 'Timesheets',
          //   type: 'item',
          //   icon: 'timer',
          //   url: '/projects/timesheets'
          // },
          {
            id: 'tasksList',
            title: 'Tasks',
            type: 'item',
            icon: 'playlist_add_check',
            url: '/task/list'
          },
          {
            id: 'tasksList',
            title: 'Timesheet Reports',
            type: 'item',
            icon: 'playlist_add_check',
            url: '/task/report'
          },
        ]
      }
    ]
  },

  {
    id: 'products',
    title: 'Product Manager',
    type: 'group',
    children: [
      {
        id: 'products',
        title: 'Products',
        //type: 'item',
        type:'collapse',
        icon: 'shopping_basket',
        children:[
          {
            id: 'products',
            title: 'Products',
            type: 'item',
            icon: 'shopping_basket',
            url: '/products/list'
          },
          {
            id: 'property',
            title: 'Property',
            type: 'item',
            icon: 'home',
            url: '/property/list'
          },
        ]
      },
      {
        id: 'shoppingCarts',
        title: 'shopping Carts',
        type: 'collapse',
        icon: 'shopping_cart',
        children: [
          {
              id: 'Orders',
              title: 'Orders',
              type: 'item',
              icon: 'format_list_numbered',
              url: '/shoppingCarte/list'
          }
                  ]
    }
    ,
      {
        id: 'Gallery',
        title: 'Gallery',
        type: 'item',
        icon: 'slideshow',
        url: '/gallery/list'
      },

    ]
  },
  
  {
    id: 'Website',
    title: 'Website Manager',
    type: 'group',
    children: [
      {
        id: 'sitemanager',
        title: 'Sites',
        type: 'item',
        icon: 'airplay',
        url: '/siteManager/websites/list'
      },
      {
        id: 'newsletter',
        title: 'Newsletter',
        type: 'item',
        icon: 'alternate_email',
        url: '/news-letter/list'
      },
      {
        id: 'contactus',
        title: 'Contact Us',
        type: 'item',
        icon: 'email',
        url: '/contact-us/list'
      }
    ]
  },
  {
    id: 'Admin',
    title: 'Admin Manager',
    type: 'group',
    children: [
      {
        id: 'businesses',
        title: 'Businesses',
        type: 'item',
        icon: 'assessment',
        url: '/business/list'
      },
      {
        id: 'members',
        title: 'Members',
        type: 'item',
        icon: 'account_box',
        url: '/members/list'
      },
      {
        id: 'MasterLookups',
        title: 'Lookups',
        type: 'item',
        icon: 'assistant_photo',
        url: '/master-lookups/list'
      }
    ]
  },
  {
    id: 'settings',
    title: 'Settings',
    type: 'item',
    icon: 'settings',
    url: '/settings/list'
  }
  
];
