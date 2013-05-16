# Xresources / Xdefaults HTML Color Tester

Simple previewing of Xdefaults/Xresources terminal color definitions. Just checkout and open index.html.

Supports resource definitions similar to the following format:

```
urxvt.background  : #000000;
*color0: #ffffff
xterm*background: #000000;
*.color7   :  #aeaeae;
```

Will fail with error (red border around textarea) if it can't find the full definitions (background/foreground and color0-color15 or if not in HEX RGB format).

## License
Copyright (c) 2013 Charles Lavery  
Licensed under the MIT license.
