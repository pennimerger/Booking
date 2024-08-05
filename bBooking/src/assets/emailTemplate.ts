
export const emailTemplate = (resetLink:string)=>{

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Password</title>
    <style>
    body {
  font-family: Arial, sans-serif;
  background-color: white;
  color: blue;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.container {
  text-align: center;
  background-color: white;
  border: 2px solid blue;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 255, 0.2);
}

.date {
  position: absolute;
  top: 10px;
  right: 20px;
  font-size: 14px;
  color: blue;
}

h1 {
  margin-bottom: 20px;
}

.reset-button {
  display: inline-block;
  padding: 10px 20px;
  color: white;
  background-color: blue;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.reset-button:hover {
  background-color: darkblue;
}
</style>
</head>
<body>
    <div class="container">
        <h1>Reset Your Password</h1>
        <p>Please click the button below to reset your password:</p>
        <a href="${resetLink}" class="reset-button">Reset Password</a>
    </div>
</body>
</html>
`
}