# BlockSmiths
# BlockSmithsN




## Table of Contents

1.  [Features](#features)
2.  [Tech Stack / Key Dependencies](#tech-stack--key-dependencies)
3.  [File Structure Overview](#file-structure-overview)
4.  [Prerequisites](#prerequisites)
5.  [Installation](#installation)
6.  [Usage / Getting Started](#usage--getting-started)
7.  [Configuration](#configuration)
8.  [Contributing](#contributing)
9.  [License](#license)
10. [Author/Acknowledgements](#authoracknowledgements)
11. [Contact](#contact)


## Features

-   Create and manage accounts.
-   Transfer assets.
-   Uses Diamnet SDK for blockchain interactions.
-   Potentially interacts with Supabase for data storage (based on dependency).

## Tech Stack / Key Dependencies

-   HTML
-   JavaScript
-   Python
-   @supabase/supabase-js
-   axios
-   diamnet-sdk
-   node-fetch

## File Structure Overview

```text
.
├── .env
├── .gitattributes
├── .gitignore
├── Diamantestuff/
├── README.md
├── app.py
├── checkasset.js
├── createaccount.js
├── package-lock.json
├── package.json
├── templates/
└── transferasset.js
```

## Prerequisites

-   Node.js (version >= 16, ideally the latest LTS version)
-   npm (Node Package Manager)
-   Python (for running `app.py`)

## Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/Boombaybay12334/BlockSmithsN.git
    ```
2.  Navigate to the project directory:
    ```bash
    cd BlockSmithsN
    ```
3.  Install the npm dependencies:
    ```bash
    npm install
    ```

## Usage / Getting Started

1.  Start the application.  Since the `package.json` doesn't define a `start` script, the execution depends on how the application is designed.
    - If it's a Node.js application controlled via Javascript (e.g., using `index.js`): `node index.js`.
    - If it's a Python Flask app: `python app.py` (ensure you have Flask installed: `pip install flask`).

<!-- TODO: Add more specific instructions based on app.py contents -->

To run the JavaScript files:

```bash
node checkasset.js
node createaccount.js
node transferasset.js
```

## Configuration

The application likely uses environment variables defined in the `.env` file.  Ensure this file exists and contains the necessary configuration details (API keys, database credentials, etc.).

<!-- TODO: Add more information about the expected contents of .env -->

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

Distributed under the ISC License. See `LICENSE` file for more information.

## Author/Acknowledgements

Worked with a Team to build this.....This is my first Project

## Contact

Abhinav Kumar Singh - [https://github.com/Boombaybay12334/BlockSmithsN](https://github.com/Boombaybay12334/BlockSmithsN) - abhinavkrsingh3016@gmail.com
