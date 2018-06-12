function html({ title }) {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>${title}</title>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/vis/4.21.0/vis.min.css" rel="stylesheet" type="text/css" />
    </head>
    <body>
        <div id="container" style="height:100vh;width:100vw"></div>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/vis/4.21.0/vis.min.js"></script>
        <script type="module" src="entry.js"></script>
    </body>
    </html>
    `
}

module.exports = html;
