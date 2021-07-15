const d = document;

const $inputFile = d.querySelector('#files');
const $form = d.querySelector('form');
const $dropZone = d.getElementById('drop_zone');

const uploader = async (file) => {
	const formData = new FormData();
	formData.append('file', file);

	try {
		const config = {
			method: 'POST',
			body: formData,
		};

		const res = await fetch('uploader.php', config);
		const serverResponse = await res.json();

		if (!res.ok) throw {status: res.status, statusText: res.statusText};

		console.log('Status ' + serverResponse.status + ' : ' + serverResponse.statusText);
	} catch (error) {
		let message = error.statusText || 'Ocurrio un error';
		console.log(`Error ${error.status}: ${message}`);
	}
};

const progressUploader = (file) => {
	const $progress = d.createElement('progress');
	const $small = d.createElement('small');

	$progress.max = 100;
	$progress.value = 1;

	$form.insertAdjacentElement('beforeend', $progress);
	$form.insertAdjacentElement('beforeend', $small);

	const fileReader = new FileReader();
	fileReader.readAsDataURL(file);

	fileReader.addEventListener('progress', (e) => {
		const progress = (e.loaded * 100) / e.total;
		$progress.value = progress;
		$small.innerHTML = `<br><b>${file.name} - ${progress}%</b>`;
	});

	fileReader.addEventListener('loadend', (e) => {
		uploader(file);
		setTimeout(() => {
			$progress.remove();
			$small.remove();
			$inputFile.value = '';
		}, 3000);
	});
};

const dropHandler = (e) => {
	e.preventDefault();
	console.log(e.dataTransfer.files);
	const files = Array.from(e.dataTransfer.files);
	files.forEach((file) => progressUploader(file));
};
const dragOverHandler = (e) => {
	e.preventDefault();
};

d.addEventListener('change', async (e) => {
	if (e.target === $inputFile) {
		const files = Array.from(e.target.files);
		files.forEach((file) => progressUploader(file));
	}
});

d.addEventListener('dragover', (e) => {
	if (e.target === $dropZone) {
		dragOverHandler(e);
	}
});

$dropZone.addEventListener('drop', dropHandler);
// $dropZone.addEventListener('dragover', dragOverHandler);
