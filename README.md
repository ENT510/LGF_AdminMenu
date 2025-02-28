![GitHub Downloads](https://img.shields.io/github/downloads/ENT510/LGF_AdminMenu/total?logo=github)
![GitHub Release](https://img.shields.io/github/v/release/ENT510/LGF_AdminMenu?logo=github)


# NOT FULLY FINISHED NOT FULLY FINISHED ⚠️⚠️


# LGF Admin Menu

This resource is in its current state, and while it's compatible with QBox and ESX, it requires my `LGF_Utility` for UI management and framework handling. Vehicle, ped, and object data are stored in `web/components/data`. Pull requests for improvements or new features are welcome.

<img src="https://github.com/user-attachments/assets/a682fa1d-83ad-4f56-a115-46698222dfd8" width="400" />
<img src="https://github.com/user-attachments/assets/6c5ed6ed-8f3f-41e6-9c15-53652f55e9ab" width="400" />
<img src="https://github.com/user-attachments/assets/26d6046a-abdf-4687-aec0-003a561d2417" width="400" />
<img src="https://github.com/user-attachments/assets/542d1883-eb0b-4c6f-a0bc-aa3e37a4af49" width="400" />

<img src="https://github.com/user-attachments/assets/b6360649-1db0-4901-ab43-f89625538c6d" width="400" />
<img src="https://github.com/user-attachments/assets/b58df5c6-e812-4312-b6ab-aeb9ec905a35" width="400" />



## Features
- **Code Execution Page**: For debugging purposes (recommended for creators only).
- **Leaflet Map with Player List**: Shows a map with a list of players.
- **Entity Spawner**: Spawn peds, objects, and vehicles in the game world.
- **Resource Manager**: Allows for managing and restarting resources.
- **Debug Tools**: Includes raycast debugging for entities.
- **Inventory Management**: Add items to the inventory.
- **Dashboard with Logs**: Keeps track of actions and provides an entity counter for better monitoring.

## Configuration

### Required Dependencies:
- **LGF_Utility**: This is required for managing the UI placement, framework interactions, and other essential functions.

### Setup Instructions:
1. **Install `LGF_Utility`**: [LGF_Utility GitHub Repository](https://github.com/Legacy-Scripts/LGF_Utility)
   - Ensure that `LGF_Utility` is installed and properly configured in your server environment.

2. **License Configuration**:
   - To give the necessary permissions, add your license details to the `modules/server/sv-config.lua` file. You can find this file within the project directory.

3. **UI and Framework Compatibility**:
   - The resource is compatible with QBox, ESX, and requires the use of the `LGF_Utility` for managing UI elements, prop placements, and framework functionalities.

4. **Data Management**:
   - Vehicle, Ped, and Object data management is handled through the `web/components/data` folder.

### Folder Structure:
- The vehicle, ped, and object data is located in: `web/components/data` and you need to rebuild the component for effective change!

## Contributing

Feel free to open issues or submit pull requests if you would like to contribute new features, optimizations, or bug fixes.
