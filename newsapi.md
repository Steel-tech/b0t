Trending Topics:

const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://news-api14.p.rapidapi.com/v2/trendings',
  headers: {
    'x-rapidapi-key': '5e6d8cbaf3msh9692bcae94c2bcbp1cf10cjsn570f775a4730',
    'x-rapidapi-host': 'news-api14.p.rapidapi.com'
  }
};

async function fetchData() {
	try {
		const response = await axios.request(options);
		console.log(response.data);
	} catch (error) {
		console.error(error);
	}
}

fetchData();

Get Article Content:

const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://news-api14.p.rapidapi.com/v2/article',
  headers: {
    'x-rapidapi-key': '5e6d8cbaf3msh9692bcae94c2bcbp1cf10cjsn570f775a4730',
    'x-rapidapi-host': 'news-api14.p.rapidapi.com'
  }
};

async function fetchData() {
	try {
		const response = await axios.request(options);
		console.log(response.data);
	} catch (error) {
		console.error(error);
	}
}

fetchData();

Supported Topics:

const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://news-api14.p.rapidapi.com/v2/info/topics',
  headers: {
    'x-rapidapi-key': '5e6d8cbaf3msh9692bcae94c2bcbp1cf10cjsn570f775a4730',
    'x-rapidapi-host': 'news-api14.p.rapidapi.com'
  }
};

async function fetchData() {
	try {
		const response = await axios.request(options);
		console.log(response.data);
	} catch (error) {
		console.error(error);
	}
}

fetchData();

Supported Languages:

const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://news-api14.p.rapidapi.com/v2/info/languages',
  headers: {
    'x-rapidapi-key': '5e6d8cbaf3msh9692bcae94c2bcbp1cf10cjsn570f775a4730',
    'x-rapidapi-host': 'news-api14.p.rapidapi.com'
  }
};

async function fetchData() {
	try {
		const response = await axios.request(options);
		console.log(response.data);
	} catch (error) {
		console.error(error);
	}
}

fetchData();

Supported countries:

const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://news-api14.p.rapidapi.com/v2/info/countries',
  headers: {
    'x-rapidapi-key': '5e6d8cbaf3msh9692bcae94c2bcbp1cf10cjsn570f775a4730',
    'x-rapidapi-host': 'news-api14.p.rapidapi.com'
  }
};

async function fetchData() {
	try {
		const response = await axios.request(options);
		console.log(response.data);
	} catch (error) {
		console.error(error);
	}
}

fetchData();
