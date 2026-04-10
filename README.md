# osu! Stats Card

![typescript](https://img.shields.io/badge/typescript-lightgrey?style=typescript&logo=typescript)
![License](https://img.shields.io/github/license/saddexed/osu-stats-card)

<a href="https://osu.ppy.sh/users/saddex">
  <img src="https://osu-stats-card.vercel.app/api/saddex?svg=true" alt="osu! stats" height="200px"/>
</a>

A serverless API that generates dynamic stat cards for osu! players. Perfect for displaying your osu! stats on GitHub profiles (why would you want to do that huh), websites, or anywhere you want really.

## Features

- Dynamic SVG or image generation with real-time osu! statistics
- Extended stats display option via query parameters 
- XP progress bar with percentage indicator
- Serverless deployment on Vercel

## Quick Start

### Display Your Stats

Add this to your GitHub README or any markdown file, replacing `your_username` with your osu! username:
```md
[![osu! stats](https://osu-stats-card.vercel.app/api/your_username)](https://osu.ppy.sh/users/your_username)
```
If you want to use html instead of markdown, you can use the following code:
```html
<a href="https://osu.ppy.sh/users/your_username">
  <img src="https://osu-stats-card.vercel.app/api/your_username?svg=true" alt="osu! stats" />
</a>
```
for example
```md
[![osu! stats](https://osu-stats-card.vercel.app/api/saddex)](https://osu.ppy.sh/users/saddex)
```
You can also visit [https://osu-stats-card.vercel.app/](https://osu-stats-card.vercel.app/) to generate and preview the osu! stats card.

### URL Format

```
https://osu-stats-card.vercel.app/api/{username}
```

## Customization Options

Control which stats are displayed using query parameters:

| Parameter | Default | Description |
|-----------|---------|-------------|
| `stats` | `true` | Show extended stats. Pass `false` or `minimal` to hide. |
| `svg` | `false` | Return raw SVG format instead of PNG image. |

```
/api/elirif?stats=minimal
```
<!-- I am using svg=true purely because it's faster to render -->
<a href="https://osu.ppy.sh/users/elirif">
  <img src="https://osu-stats-card.vercel.app/api/elirif?stats=minimal&svg=true" alt="osu! stats" height="120px"/>
</a>

```
/api/altbalaji
```

<a href="https://osu.ppy.sh/users/altbalaji">
  <img src="https://osu-stats-card.vercel.app/api/altbalaji?svg=true" alt="osu! stats" height="172px"/>
</a>

If you want to reduce/increase the size of the image, use html height attribute
```html
<a href="https://osu.ppy.sh/users/saddex">
  <img src="https://osu-stats-card.vercel.app/api/saddex?svg=true" alt="osu! stats" height="200px"/>
</a>
```

```markdown
> Note: SVG renders faster than images. Use ?svg=true when possible for better performance.
```


## Development (Skip if you just want to use it)

### Prerequisites

- Node.js 16+ installed
- Vercel account
- osu! API v1 key ([Get one here](https://osu.ppy.sh/p/api))

### Setup

1. Clone the repository:
```bash
git clone https://github.com/saddexed/osu-stats-card.git
cd osu-stats-card
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
OSU_API_KEY=your_api_key_here
```

4. Test locally:
```bash
npm run dev
```

Visit `http://localhost:3000/api/your-username` to see your stats card.

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Add environment variable in Vercel dashboard:
   - Go to your project settings
   - Add `OSU_API_KEY` with your osu! API key

4. Your API will be live at `https://your-project.vercel.app/api/username`


## License

GPL-3.0 License - see [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## Acknowledgments

- osu! API for providing player statistics
- Vercel for serverless hosting
- Inspired by [osu-score-embed](https://github.com/BRAVO68WEB/osu-score-embed)
- [mrbvrz/segoe-ui-linux](https://github.com/mrbvrz/segoe-ui-linux) for providing the Segoe UI fonts
