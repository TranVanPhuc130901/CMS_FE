import { NextApiHandler } from "next";
import fs from "fs/promises";
import path from "path";

const handler: NextApiHandler = async (req, res) => {
  try {
    const filename = req.query.filename as string | undefined; // Lấy tên file cần xóa từ query params

    if (!filename) {
      return res.status(400).json({ error: "Missing filename" });
    }

    // Kiểm tra xem file có tồn tại trong thư mục /public/images không
    const imagePath = path.join(process.cwd(), "/public/images", filename);
    const fileExists = await fs
      .access(imagePath)
      .then(() => true)
      .catch(() => false);

    if (!fileExists) {
      return res.status(404).json({ error: "File not found" });
    }

    // Xóa file
    await fs.unlink(imagePath);

    res.json({ success: true });
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({ error: "Failed to delete image" });
  }
};

export default handler;
