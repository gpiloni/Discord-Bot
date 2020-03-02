async function main() {
    // Imports the Google Cloud client library
    const speech = require('@google-cloud/speech');
    const fs = require('fs');

    // The name of the audio file to transcribe
    const fileName = 'sound-silvio.mp3';

    // Creates a client
    const client = new speech.SpeechClient({
        credentials:{
            "type": "service_account",
            "project_id": "bot-discord-269701",
            "private_key_id": "1b883dd24e859590f5c49668833071183cef69f5",
            "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDnhGUfRbIzv2Po\nn+/nHPHsoVtjQwv4/jGzEZq0i6bJG33bLeD5qJHmIkeU1XQoSxF/+ZRjhADWLbYZ\n3gnBuQA8HzU8zM0KWJLh0NNQqwFw5mKRO66QF8GdpQPDOs2QHlVvzfD+LOCcRGaJ\nngQeb4FNAVscksYKOATPw2sKxWBrpO814Q3ooTf4bZVveWp1ZgiKE2F+BwNt6Ugb\nXNZDo7SNjbf0IPeNJOxuAF7riZt+6Q3IB4a1l/GbZGPaBdGMeSQEX0TiZwiF6zHJ\n7GVwvSpDyPyBW0ANwN836wgcVPujOp4k8bkwJxNWoNl6w5TDTWN1/FSD4cI4sG1D\nqIi6zoKjAgMBAAECggEAAJ3PIR6v40hirTdjzaM7l6w0UJbYnNCcdEQbO9jVWFq8\n4o0EONX0kX7M3v4UgZj1kngpJ3yt/eQARKBdOUlTUVWp8CABecITngtOzLuv1Mug\nPo/AnryZdOCAGpB5BKW4B4SuXBblgDUEauBjVWtpljlnMzPG2Dce+Cimi9BLue2k\ns1Ww+30biLuzMCGKfXwWVI9A72Bb/soMk2X64dTcKKYJMvNoz28Z79FBjdm2S6Em\nkSbP4KwFvaKYgX+fuPTFzPRfOKl0EK06ezDhlzOVqX1XLNRvt/AkpM3QZRVPEMsS\n7zsP0tZcmcDU1G/HKCGZVvphmy1fFcMPVUiVL5qtFQKBgQD7uQVAPYc/YRXsGCnn\nc2FZKo7qI8wQebHywXNXsjVRQMVnjFNxR3Jyz0h55T799/a4Z8FLEQS+iiAtB3eS\nG2KDm0TEgsUYxb+BObgLb53LTbKGHgGULTjj6prp37UKE8HR+y7mVbJlT9fVkOZJ\nrJBVsykqK7oheSiD0HAcwxjRfwKBgQDrc3s/GbtQHTvnNH+/HoMfYw/X/KQIAhaF\n10NObpmuG1nGhbfehmCCiqFYCBn9HiG5bOv3cteLl73FuLEh+7tK/QW0Z3HsoDLL\nFqQq7/6P/56oBI/hm8hpaIPoG1E89rGtpEPYIs2G+yYNDmHsmO4+D4VJzNFrvR4l\nGGMCzKJY3QKBgQCWOukoWtBCAiY8Pnub15+MwLqEgJLEbmzGba/x8biiYp6t2vDd\n1X83iABAR5IdroR/r+SLcX+8W+EyHpe9Cjz0QJF9GnKZA0P00sbFhHrPH/Lg2j2k\n+oxOcfC8jbeVaQ8uy9NEwnZywoEUw6K865FEpGV39priaVXFvXt7nvBL7wKBgQCv\nBAFJ70ugCor7mreWjgyzqQQe7anUVhD93fwm8emEVMpP2hfJ7iMRBhFWiXcgAmTZ\nG1Dvd8sm9V1X+qiYdTFMVXYHGpnBZXc8JRFU5V5ZFY6OoA1/izfWupzKTHv/j/SU\n+TSBFaWmv0sSi21Y3HjDYvAV4oyMxGAC/PSkIQ5QdQKBgCQ96RYCfllA18izZmpe\ngMnLKBfO4l8EfVAwIXJ8PvwcCi40Y9tJWS1N4kBPWCxOgr/fAqUqA/nBmDbujf5r\nmuFm9t1nwlAzrsA74B9hf+WayrN1tgV9Br8fRx+hnOnl/uRudf7SPp47SUyg3Ou9\n3KbfeWeG9QVt+FY6zj9GDeGf\n-----END PRIVATE KEY-----\n",
            "client_email": "text-api@bot-discord-269701.iam.gserviceaccount.com",
            "client_id": "112768340753801118336",
            "auth_uri": "https://accounts.google.com/o/oauth2/auth",
            "token_uri": "https://oauth2.googleapis.com/token",
            "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
            "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/text-api%40bot-discord-269701.iam.gserviceaccount.com"
          }
          
    });



    // Reads a local audio file and converts it to base64
    const file = fs.readFileSync(fileName);
    const audioBytes = file.toString('base64');

    // The audio file's encoding, sample rate in hertz, and BCP-47 language code
    const audio = {
      content: audioBytes,
    };
    const config = {
      encoding: 'mp3',
      sampleRateHertz: 16000,
      languageCode: 'pt-BR',
    };
    const request = {
      audio: audio,
      config: config,
    };

    // Detects speech in the audio file
    const [response] = await client.recognize(request);

    const transcription = response.results
      //.map(result => result.alternatives.toLocaleString())
      .map(result => result.alternatives[0].transcript)
      .join('\n');
 //   console.log(`Transcription: ${transcription}`);
    console.log(`Transcription: ${transcription}`);
  }
  main().catch(console.error);