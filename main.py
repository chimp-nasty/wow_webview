import webview
import os

class API:
    def run_script(self):
        print("Python script is running!")
        # Do something real here, like call another function or script
        return "Script complete"
    
## paths
path_base = os.path.abspath(os.path.dirname(__file__))
path_index = os.path.join(path_base, 'index.html')

path_home = os.path.join(path_base, 'templates', 'home.html')
path_login = os.path.join(path_base, 'templates', 'login.html')


if __name__ == '__main__':
    api = API()
    webview.create_window(
        'My SPA App',
        path_index,
        js_api=api,
        width=960,
        height=540,
        resizable=False
    )
    webview.start(debug=True, gui='edgechromium')