import child_process from 'child_process';
let exec = child_process.exec;
function open() {
	exec('node src/main.js', function (err, stdout, stderr) {
		if (err) {
			console.log(stdout);
			console.log('==============');
			console.log(err);
		} else {
			console.log(stdout);
		}
		console.log("服务器重启");
		open();
	});
}

console.log("服务器启动");
open();
