/*
 * @Author: pony@diynova.com
 * @Date: 2022-05-28 16:39:52
 * @LastEditors: pony@diynova.com
 * @LastEditTime: 2022-05-30 13:59:10
 * @FilePath: /secure-movie/tailwind.config.js
 * @Description: 
 */
module.exports = {
  mode: 'jit',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      minWidth: {
        '0': '0',
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        'full': '100%',
      },
      fontSize: {
        font22xl: ['1.45rem']
      },
      colors: {
        gray999: '#999',
        gray333: '#333',
        gray666: '#666',
        gray3d: '#3D3D3D', 
        grayde: '#DEDEDE',
        gray0: '#000',
        grayf: '#fff',
        grayd8: '#D8D8D8',
        grage1: '#E1E1E1',
        grage8: '#E82DEF',
        gragee: '#EEEEEE',
        grag1e: '#1ED663 ',
        greenbg: '#405e27',
        reded: '#ED1B24',
        black33: "333333",
        grayc4: "C4C4C4"
      },
      backgroundImage: {
        'nextbg': "url('/assets/image/next.png')",
        'prevbg': "url('/assets/image/prev.png')",
        'auctionsbg': "url('/assets/image/auctiongbg.png')",
        'flower-bg': 'url("/assets/image/flower_bg.jpg")',
        'home-bg': 'url("/assets/image/home_bg.png")',
        'solid-bg': 'url("/assets/image/solid.png")'
      },
    },
  },
  variants: {
    extend: {},
  },
  
  plugins: [
    
  ],
}
