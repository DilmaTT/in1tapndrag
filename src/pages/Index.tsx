import { useState } from "react";
import React from "react";
import { Navigation } from "@/components/Navigation";
import { UserMenu } from "@/components/UserMenu";
import { RangeEditor } from "@/components/RangeEditor";
import { Training } from "@/components/Training";
import { Library } from "@/components/Library";
import { Button } from "@/components/ui/button";
import { Monitor, Smartphone } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const [activeSection, setActiveSection] = useState<'editor' | 'training' | 'library'>('editor');
  const [forcedLayout, setForcedLayout] = useState<'desktop' | null>(null);
  const [forceMobileOnDesktop, setForceMobileOnDesktop] = useState(false);
  const isMobileDevice = useIsMobile();

  // Updated logic to allow forcing mobile view on desktop
  const isMobileLayout = (isMobileDevice && forcedLayout !== 'desktop') || (!isMobileDevice && forceMobileOnDesktop);

  const renderSection = () => {
    switch (activeSection) {
      case 'editor':
        return <RangeEditor isMobileMode={isMobileLayout} />;
      case 'training':
        return <Training isMobileMode={isMobileLayout} />;
      case 'library':
        return <Library isMobileMode={isMobileLayout} />;
      default:
        return <RangeEditor isMobileMode={isMobileLayout} />;
    }
  };

  // This button is now rendered on all devices
  const LayoutToggleButton = (
    <Button
      variant="outline"
      size="sm"
      onClick={() => {
        if (isMobileDevice) {
          setForcedLayout(forcedLayout === 'desktop' ? null : 'desktop');
        } else {
          setForceMobileOnDesktop(!forceMobileOnDesktop);
        }
      }}
      className="flex items-center justify-center h-10 w-10 p-0"
    >
      {isMobileLayout ? (
        <Monitor className="h-4 w-4" />
      ) : (
        <Smartphone className="h-4 w-4" />
      )}
    </Button>
  );

  const mobileHeaderActions = (
    <div className="flex items-center gap-2 ml-auto">
      {LayoutToggleButton}
      <UserMenu isMobileMode={isMobileLayout} />
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {!isMobileLayout ? (
        // Desktop Layout
        <>
          <div className="p-4 border-b bg-card">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <Navigation 
                activeSection={activeSection} 
                onSectionChange={setActiveSection} 
              />
              <div className="flex items-center gap-2">
                {LayoutToggleButton}
                <UserMenu isMobileMode={isMobileLayout} />
              </div>
            </div>
          </div>
          {renderSection()}
        </>
      ) : (
        // Mobile Layout
        <div className="min-h-screen bg-background flex flex-col">
          <div className="px-4 border-b bg-card">
            <div className="flex items-center justify-between">
              <Navigation 
                activeSection={activeSection} 
                onSectionChange={setActiveSection}
                isMobile={true}
                mobileActions={mobileHeaderActions}
              />
            </div>
          </div>
          <div className="flex-1 flex flex-col">
            {renderSection()}
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
