import qrcode

# Website URL
url = "https://adn615.github.io/"

# Create QR code
qr = qrcode.QRCode(
    version=1,  # controls size (1 = small)
    error_correction=qrcode.constants.ERROR_CORRECT_H,
    box_size=10,  # size of each box
    border=4,  # quiet zone
)

qr.add_data(url)
qr.make(fit=True)

# Generate image
img = qr.make_image(fill_color="black", back_color="white")

# Save image
img.save("./assets/website_qr_code.png")

print("QR code generated and saved as website_qr_code.png")
