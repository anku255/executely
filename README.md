## Executely

### What is this?

Executely is a webapp which can be used to execute handwritten or printed code in your browser. You just need to upload an image containing the source code and you can check the output of the code within a few seconds. 

### Why does this project exist?

In India, majority of universities still ask their students to write code on paper and it is extremely difficult to check the correctness or output of such code. With executely, professors can just take a snapshot of the code and get the output in a few seconds.

### Where can I see this?

You can visit this website by clicking [here](https://executely.netlify.app/).

### How does this work?

Executely uses Google's Cloud Vision OCR API to parse text from the image. For execution of the code, Executely uses [Jdoodle's API](https://www.jdoodle.com/).

### What languages are currently supported?

Executely supports C, C++, JavaScript and Python.

### Show me some screenshots.

![Step 1](https://i.imgur.com/vaWupn6.png)
![Step 2](https://i.imgur.com/thnV2Na.png)
![Step 3](https://i.imgur.com/SK2zsvx.png)

### How to run this locally?

* Clone this repository.

#### Setting up Environment Variables

* Create a file called `variables.env` in the `server` directory. Provide the values for following keys -

```
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_FOLDER=
GOOGLE_CLOUD_JSON=
JDOODLE_CLIENT_ID=
JDOODLE_CLIENT_SECRET=
```

#### Installing dependencies

* `npm install`
* `npm run server-install`

#### Running both client and server
* `npm run dev`
