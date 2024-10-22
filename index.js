const readline = require("readline");
const displayHeader = require("./utils/Header");
const requestGas = require("./claim");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true,
});

function promptForAddress() {
  return new Promise((resolve) => {
    rl.question("Masukkan Address Sui: ", (address) => {
      const isValidAddress = /^0x[a-fA-F0-9]{64}$/.test(address);
      if (isValidAddress) {
        resolve(address);
      } else {
        console.log('Alamat Sui tidak valid! Harus diawali dengan "0x" diikuti 64 karakter heksadesimal.');
        resolve(promptForAddress());
      }
    });
  });
}

async function startAutoClaim(address) {
  await requestGas(address);

  setInterval(async () => {
    console.log("Mengklaim koin gas otomatis...");
    await requestGas(address);
  }, 3600000);
}

async function run() {
  displayHeader("Bot Auto Claim Faucet SUI Testnet", async () => {
    try {
      const address = await promptForAddress(); // Meminta alamat setelah header ditampilkan
      console.log(`Alamat Sui yang dimasukkan: ${address}`);
      await startAutoClaim(address);
    } catch (error) {
      console.error("❌ Terjadi kesalahan: ", error.message);
    } finally {
      rl.close();
    }
  });
}

run();
