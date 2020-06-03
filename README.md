# Chess Run Browser Extensions

This repo contains the code for the chess run browser extension.

As firefox is standards compliant I am using this for the main implementation.

To build the chrome extension from this extension (making use of Firefox's [polyfill](https://github.com/mozilla/webextension-polyfill)) run:

```bash
$ ./build_chrome.sh
```

Then a folder will be created called `chrome-ext` that will contain the chrome extension.
