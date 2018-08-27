
const displayContextMenu = (contextMenuTemplate, e) => {
    const source = document.getElementById('context-template').innerHTML;
    const template = Handlebars.compile(source); 
    document.getElementById('context-div').innerHTML = template(contextMenuTemplate);

    const dropMenu = document.getElementById('context-menu');
    dropMenu.style.display = 'block';
    dropMenu.style.left = `${e.pageX}px`
    dropMenu.style.top = `${e.pageY}px`
};

const hideContextMenu = () => {
    const contextMenu = document.getElementById('context-menu')
    if (contextMenu) contextMenu.style.display = 'none';
};

