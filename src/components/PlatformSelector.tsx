import type { Platform } from "@/hooks/usePlatforms";
import usePlatforms from "@/hooks/usePlatforms";
import { Button, Menu } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";

interface Props {
  onSelectPlatform: (platform: Platform) => void;
  selectedPlatformId?: number;
}

const PlatformSelector = ({ onSelectPlatform, selectedPlatformId }: Props) => {
  const { data, error } = usePlatforms();
  const selectedPlatform = data.results.find(
    (p) => p.id === selectedPlatformId,
  );

  if (error) return null;

  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button>
          {selectedPlatform?.name || "Platforms"}
          <BsChevronDown />
        </Button>
      </Menu.Trigger>

      <Menu.Positioner>
        <Menu.Content>
          {data?.results.map((platform) => (
            <Menu.Item
              onClick={() => onSelectPlatform(platform)}
              key={platform.id}
              value={platform.name}
            >
              {platform.name}
            </Menu.Item>
          ))}
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  );
};

export default PlatformSelector;
