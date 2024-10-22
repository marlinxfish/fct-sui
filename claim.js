const axios = require("axios");
const ora = require("ora");

const faucetUrl = "https://faucet.testnet.sui.io/v1/gas";

async function requestGas(walletAddress) {
  const payload = {
    FixedAmountRequest: {
      recipient: walletAddress,
    },
  };

  const spinner = ora("Mengirim permintaan untuk mengklaim koin gas...").start();

  try {
    const response = await axios.post(faucetUrl, payload);

    if (response.status === 202) {
      spinner.succeed("✅ Permintaan berhasil! Anda akan menerima koin gas dalam waktu dekat.");

      const currentTime = new Date().toLocaleString();

      console.log("\n===========================================");
      console.log(`[${currentTime}]`);
      console.log(`✨ Address: ${walletAddress}`);
      console.log(`💰 Berhasil Claim: 1 SUI`);
      console.log("===========================================\n");
    } else {
      spinner.fail("⚠️ Permintaan gagal: " + (response.data || "Tidak ada data dari respons."));
    }
  } catch (error) {
    spinner.fail("❌ Terjadi kesalahan saat mengirim permintaan: " + (error.response ? error.response.data : error.message));
  } finally {
    spinner.stop(); // Pastikan spinner berhenti setelah selesai
  }
}

module.exports = requestGas;
