/*! Blitz Smart Card v1.1.7 | (c) Reak Soft, OOO | identityblitz.com */
/*
Example of the plugin initialization:
var pFactory = Blitzsc.createFactory(pluginName, mimeType, hostname, "1.6.0.0"); //Ask the value of pluginName, mimeType, hostname from the vendor.
pFactory(successHandler, errorHandler);
function successHandler(plugin) {
    // do something ...    
};
function errorHandler() {
    switch(arguments[0]) {   
        case "plugin_not_available": 
            //plugin is not installed or not allowed.
            //...show an instruction how to download and install the plugin
            arguments[2](successHandler, errorHandler);
            break;
        case "plugin_not_allowed":   
            // plugin is installed but it's not allowed (only for Firefox NPAPI). The waiting function is avaliable as arguments[2].
            //...show an instruction how to permit the browser accessing the plugin
            arguments[2](successHandler, errorHandler);
            break;
        case "plugin_not_valid":                
            //plugin is installed but it is not valid. On of the reasons is that the plugin doesn't work correctly. Try to reinstall it or contact the plugin's vendor.
            break;
        case "plugin_old_version":
            //plugin version is outdated. The current version of plugin is avaliable as argument[1].
            //...            
            break;
        case "chrome_extension_not_available":
            //chrome extension is not installed. The extension's URL is available as arguments[1]. The waiting function is available as arguments[2]. 
            //ask user to install extension, see extension's link in arguments[1]
            arguments[2](successHandler, errorHandler);
            break;
        case "firefox_extension_not_available":
            //firefox extension is not installed. Arguments:
                //1 - extension's URL on mozilla.org. Currently it's not possible to install extension from mozilla.org before the end of review process by Mozilla;
                //2 - waiting function;
                //3 - extension's URL on identityblitz.ru. 
                //4 - function to install the extension from identityblitz.ru. Function works only if called by users's click. The anchor's href must be defined as arguments[3]. 
            //...
            break;
    }
}
 */
(function (global, factory) {
  if (
    typeof exports === 'object' &&
    exports &&
    typeof exports.nodeName !== 'string'
  ) {
    factory(exports); // CommonJS
  } else if (typeof define === 'function' && define.amd) {
    define(['exports'], factory); // AMD
  } else {
    global.Blitzsc = {};
    factory(global.Blitzsc); // script, wsh, asp
  }
})(this, function blitzscFactory(blitzsc) {
  var chromeExtensionId = 'pomekhchngaooffdadfjnghfkaeipoba';

  var BRO_INF = (function () {
    var ua = navigator.userAgent,
      tem,
      M =
        ua.match(
          /(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i
        ) || [];
    if (/trident/i.test(M[1])) {
      tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
      return 'IE ' + (tem[1] || '');
    }
    if (M[1] === 'Chrome') {
      tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
      if (tem !== null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) !== null) M.splice(1, 1, tem[1]);
    return M;
  })();

  /* get the cb as the first argument and parameters as others*/
  function applyCb() {
    switch (arguments.length) {
      case 0:
        break;
      case 1:
        arguments[0].apply(blitzsc);
        break;
      default:
        var args = Array.prototype.slice.call(arguments, 1);
        arguments[0].apply(blitzsc, args);
    }
  }

  const modulesOpenList = document.querySelector('.openModulesList');
  //modulesOpenList.addEventListener('click', function(){
  //    document.querySelector('.modules').style.display='block';
  //});

  function createFactory(pluginName, mimeType, hostname, minVersion) {
    var parsedMinVersion = parsePluginVersion(minVersion);
    if (minVersion && parsedMinVersion.length != 4) {
      console.error(
        "The specified plugin's version (" +
          minVersion +
          ') has incorrect format. Example of the ' +
          "correct format: '1.0.0.0'"
      );
      throw 'plugin_wrong_version';
    }

    if (
      BRO_INF[0] === 'Chrome' ||
      (BRO_INF[0] === 'Firefox' && parseInt(BRO_INF[1].split('.')[0]) >= 52)
    ) {
      return nativeMessageFactory;
    } else {
      return objectFactory;
    }

    function parsePluginVersion(version) {
      var nums =
        version !== undefined && version !== null ? version.split('.') : [];
      var versions = [];
      for (var i = 0; i < nums.length; i++) {
        versions.push(parseInt(nums[i]));
      }
      return versions;
    }

    function checkPlugin(plugin, sCb, fCb) {
      function errCb(error) {
        applyCb(fCb, 'plugin_not_valid', error);
        console.error(error);
      }
      function setPlugin() {
        blitzsc.plugin = plugin;
        applyCb(sCb, plugin);
      }

      plugin.valid.then(function (res) {
        if (res) {
          if (minVersion) {
            plugin.version.then(function (v) {
              var pluginVersion = parsePluginVersion(v);
              var isSuitable = true;
              for (var i = 0; i < pluginVersion.length; i++) {
                if (pluginVersion[i] > parsedMinVersion[i]) {
                  isSuitable = true;
                  break;
                } else if (pluginVersion[i] < parsedMinVersion[i]) {
                  isSuitable = false;
                  break;
                }
              }
              if (isSuitable) {
                setPlugin();
              } else {
                applyCb(fCb, 'plugin_old_version', v);
              }
            }, errCb);
          } else {
            setPlugin();
          }
        } else {
          applyCb(fCb, 'plugin_not_valid');
        }
      }, errCb);
    }

    /* Firefox, Explorer and others NPAPI */
    function objectFactory(sCb, fCb) {
      var plugin = blitzsc.plugin;
      if (plugin) {
        applyCb(sCb, plugin);
        return;
      }

      function initPluginObject() {
        plugin = document.getElementById('blitzScPlugin');
        if (!plugin) {
          var obj = document.createElement('object');
          obj.setAttribute('id', 'blitzScPlugin');
          obj.setAttribute('type', mimeType);
          obj.setAttribute('height', 0);
          obj.setAttribute('width', 0);
          document.body.appendChild(obj);
          plugin = document.getElementById('blitzScPlugin');
        }
      }

      function waitingPluginAllow(_sCb, _fCb) {
        function waitingPluginAllowTick() {
          plugin = document.getElementById('blitzScPlugin');
          if ('valid' in plugin) {
            checkPlugin(plugin, _sCb, _fCb);
          } else {
            setTimeout(waitingPluginAllowTick, 3000);
          }
        }

        waitingPluginAllowTick();
      }

      function checkPluginByNavigator(pname) {
        var hasPluginsProp = navigator && navigator.plugins;
        if (!hasPluginsProp) return false;
        for (var i = 0; i < navigator.plugins.length; i++) {
          if (navigator.plugins[i].name.indexOf(pname) != -1) {
            return true;
          }
        }
        return false;
      }

      function waitingPluginInstallation(_sCb, _fCb) {
        function waitingPluginInstallationTick() {
          initPluginObject();
          if ('valid' in plugin) {
            checkPlugin(plugin, _sCb, _fCb);
          } else {
            var hasPluginsProp = navigator && navigator.plugins;
            if (hasPluginsProp) {
              navigator.plugins.refresh();
            }
            if (hasPluginsProp && checkPluginByNavigator(pluginName)) {
              applyCb(_fCb, 'plugin_not_allowed', '', waitingPluginAllow);
            } else {
              plugin.parentNode.removeChild(plugin);
              setTimeout(waitingPluginInstallationTick, 3000);
            }
          }
        }

        waitingPluginInstallationTick();
      }

      initPluginObject();
      if ('valid' in plugin) {
        checkPlugin(plugin, sCb, fCb);
      } else {
        if (checkPluginByNavigator(pluginName)) {
          // this check doesn't work for IE
          // currently we decided not to delete it because in that case user doesn't see
          // the dialog to activate plugin.
          applyCb(fCb, 'plugin_not_allowed', '', waitingPluginAllow);
        } else {
          plugin.parentNode.removeChild(plugin);
          applyCb(fCb, 'plugin_not_available', '', waitingPluginInstallation);
        }
      }
    }

    /* Chrome, Firefox */
    function nativeMessageFactory(sCb, fCb) {
      var plugin = blitzsc.plugin;
      if (plugin) {
        applyCb(sCb, plugin);
        return;
      }

      var receivedExtensionResponse = false;
      var wyrmholeCreated = false;
      var pluginCreated = false;
      var callbackFn = 'blitzsc_fwcb';

      function createPlugin(wyrmhole, _sCb, _fCb) {
        // We have the wyrmhole now
        var FWJS = window.FireWyrmJS;
        var fwjsFactory = new FWJS(wyrmhole);
        fwjsFactory.create(mimeType, {}).then(
          function (p) {
            pluginCreated = true;
            checkPlugin(p, _sCb, _fCb);
          },
          function (err) {
            applyCb(_fCb, 'plugin_not_available', err);
            console.error(err);
          }
        );
      }

      function makeWaitingWyrmholeFn(helper) {
        return function (_sCb, _fCb) {
          var callbackWaitWyrmholeFn = 'blitzsc_fwcb_wait_wyrmhole_check';

          function tryToCreate() {
            var whDfd = helper.create(void 0, mimeType, hostname);
            whDfd.then(
              function (wyrmhole) {
                wyrmholeCreated = true;
                createPlugin(wyrmhole, _sCb, _fCb);
              },
              function (err) {
                setTimeout(window[callbackWaitWyrmholeFn], 3000);
              }
            );
          }

          window[callbackWaitWyrmholeFn] = function () {
            if (!wyrmholeCreated) {
              tryToCreate();
            }
          };
          tryToCreate();
        };
      }

      function regExtensionCallbackFn(_sCb, _fCb) {
        window[callbackFn] = function (inp) {
          receivedExtensionResponse = true;
          var helper = inp.wyrmhole;
          var whDfd = helper.create(void 0, mimeType, hostname);
          whDfd.then(
            function (wyrmhole) {
              wyrmholeCreated = true;
              createPlugin(wyrmhole, _sCb, _fCb);
            },
            function (err) {
              applyCb(
                _fCb,
                'plugin_not_available',
                err,
                makeWaitingWyrmholeFn(helper, _sCb, _fCb)
              );
              console.error('Error instantiating the wyrmhole:', err);
            }
          );
        };
      }

      function waitExtension(_sCb, _fCb) {
        var callbackCheckFn = 'blitzsc_fwcb_check';
        window[callbackCheckFn] = function () {
          if (!receivedExtensionResponse) {
            window.postMessage(
              { firebreath: 'Reaxoft', callback: callbackFn },
              '*'
            );
            setTimeout(window[callbackCheckFn], 3000);
          }
        };
        regExtensionCallbackFn(_sCb, _fCb);
        window.postMessage(
          { firebreath: 'Reaxoft', callback: callbackFn },
          '*'
        );
        setTimeout(window[callbackCheckFn], 3000);
      }

      // var siteExtUrl = "https://identityblitz.ru/products/smart-card-plugin/files/blitz_smart_card_plugin-1.1.14-an+fx.xpi";
      // var extHash = 'sha256:147f9cd43681204b477ce319c64c38c6d2eb2288abecd48a263cdb90d38e73b8';
      var siteExtUrl =
        'https://identityblitz.ru/products/smart-card-plugin/files/blitz_smart_card_plugin-1.1.10-an+fx.xpi';
      var extHash = 'sha1:DA80BDDE3922C28A8A93F1F0A790FA111449CA03';

      function installFireroxExtension() {
        var xpi = {
          BlitzScPluginAdapter: {
            URL: siteExtUrl,
            Hash: extHash,
            toString: function () {
              return this.URL;
            },
          },
        };
        InstallTrigger.install(xpi);
      }

      if (
        document.documentElement.className.indexOf('BlitzScPluginAdapter') ===
        -1
      ) {
        if (BRO_INF[0] === 'Chrome') {
          applyCb(
            fCb,
            'chrome_extension_not_available',
            'https://chrome.google.com/webstore/detail/' + chromeExtensionId,
            waitExtension
          );
        } else {
          applyCb(
            fCb,
            'firefox_extension_not_available',
            'https://addons.mozilla.org/ru/firefox/addon/blitz-smart-card-plugin-add-on/',
            waitExtension,
            siteExtUrl,
            installFireroxExtension
          );
        }
        return;
      }

      regExtensionCallbackFn(sCb, fCb);
      window.postMessage({ firebreath: 'Reaxoft', callback: callbackFn }, '*');
    }
  }

  blitzsc.createFactory = createFactory;
});
