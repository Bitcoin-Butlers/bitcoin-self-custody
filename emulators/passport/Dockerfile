# Passport Simulator — Docker Build
# Builds the official Foundation Passport simulator in a container.
#
# Build:  docker build -t passport-sim .
# Run:    docker run -it --rm -e DISPLAY=$DISPLAY -v /tmp/.X11-unix:/tmp/.X11-unix passport-sim
#
# On macOS with XQuartz:
#   xhost + 127.0.0.1
#   docker run -it --rm -e DISPLAY=host.docker.internal:0 passport-sim
#
# Note: Requires X11 forwarding for the SDL display window.

FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive

# System dependencies
RUN apt-get update && apt-get install -y \
    git curl build-essential \
    gcc-arm-none-eabi \
    autotools-dev automake \
    libusb-1.0-0-dev libtool \
    python3 python3-pip python3-virtualenv \
    libsdl2-dev pkg-config \
    xterm \
    && rm -rf /var/lib/apt/lists/*

# Rust toolchain
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y --default-toolchain 1.77.1
ENV PATH="/root/.cargo/bin:${PATH}"
RUN rustup target add thumbv7em-none-eabihf && cargo install cbindgen just

# Clone passport2
WORKDIR /opt
RUN git clone https://github.com/Foundation-Devices/passport2.git

# Build mpy-cross
WORKDIR /opt/passport2
RUN make -C mpy-cross -j$(nproc)

# Python deps
RUN pip3 install Pillow==8.4.0 opencv-python-headless

# Default to color simulator
WORKDIR /opt/passport2/simulator
CMD ["just", "sim", "color"]
