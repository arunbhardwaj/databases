/*  DEPRECATED
This function is supposed to handle all escaping. For some reason it also
escapes spaces to '%20' but not sure why. Swapped over to using the
jQuery templates to handle escaping. Check messageView.js for more info.
*/

const replacers = {
  '&': '&amp',
  '"': '&quot',
  '\'': '&apos',
  '<': '&lt',
  '>': '&gt'
};

const escape = function(string) {
  for (var key in replacers) {
    string = string.replaceAll(key, replacers[key]);
  }
  return string;
};

// console.log(escape('this is a "<script>document.getElementbyId&</script>");'));