interface Colors {
  [key:string]: string | string[];
}

const colors: Colors = {
    bg: ['#ffffff', '#f6f6f6'],
    darkestBg: '#212121',
    mg: 'rgba(0,0,0,0.15)', // '#424242',
    fg: 'rgba(0,0,0,0.1)',
    darkOverlay: 'rgba(0,0,0,0.7)',
    text: '#444444',
    active: '#656565',
    hilite: '#ff835d', //'#ff3300',
    white: '#ffffff',
    ok: 'rgba(67,165,252,0.9)',
    error: '#ff0000',
    purple: '#36079b',
    border: '#ff0000',
};

export default colors;
