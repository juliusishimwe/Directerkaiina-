import { useState, useEffect, useRef } from "react";
import { Mail, Phone, MapPin, Edit } from "lucide-react";
import gsap from "gsap";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import contactImage from "figma:asset/dddd.jpg.jpeg";

export function Contact() {
  const [email, setEmail] = useState("contact@kaiina.com");
  const [phone, setPhone] = useState("+1 (234) 567-890");
  const [location, setLocation] = useState("Los Angeles, CA");

  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [tempEmail, setTempEmail] = useState("");
  const [tempPhone, setTempPhone] = useState("");
  const [tempLocation, setTempLocation] = useState("");

  const sectionRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    // Initialize AudioContext on user interaction
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }, []);

  const playClickSound = () => {
    if (!audioContextRef.current) return;

    const audioContext = audioContextRef.current;
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  };

  const handleEditClick = () => {
    playClickSound();

    // Animate background
    if (sectionRef.current) {
      gsap.to(sectionRef.current, {
        backgroundColor: "#1c1f24",
        duration: 0.6,
        ease: "power2.inOut"
      });
    }

    setPasswordInput("");
    setPasswordError("");
    setIsPasswordDialogOpen(true);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === "kaiina the D") {
      playClickSound();
      setIsPasswordDialogOpen(false);
      setTempEmail(email);
      setTempPhone(phone);
      setTempLocation(location);
      setIsEditDialogOpen(true);
      setPasswordInput("");
      setPasswordError("");
    } else {
      setPasswordError("Incorrect password. Please try again.");
    }
  };

  const handleSaveContact = (e: React.FormEvent) => {
    e.preventDefault();
    playClickSound();
    setEmail(tempEmail);
    setPhone(tempPhone);
    setLocation(tempLocation);
    setIsEditDialogOpen(false);

    // Animate background back to original
    if (sectionRef.current) {
      gsap.to(sectionRef.current, {
        backgroundColor: "#000000",
        duration: 0.6,
        ease: "power2.inOut"
      });
    }
  };

  return (
    <section ref={sectionRef} id="contact" className="py-12 sm:py-16 md:py-20 px-4 bg-black transition-colors duration-600">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-6 sm:mb-8">
          <img
            src={contactImage}
            alt="Contact"
            className="w-24 h-24 sm:w-32 sm:h-32 rounded-full mx-auto object-cover border-4 border-blue-400"
          />
        </div>
        <h2 className="text-3xl sm:text-4xl mb-4 sm:mb-6 text-white">Let's Work Together</h2>
        <p className="text-gray-400 mb-8 sm:mb-12 text-base sm:text-lg">
          Have a project in mind? I'd love to hear about it and discuss how we can bring your vision to life.
        </p>
        
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 bg-gray-900 rounded-full flex items-center justify-center mb-4">
              <Mail className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-white mb-2">Email</h3>
            <a href={`mailto:${email}`} className="text-gray-400 hover:text-blue-400 transition-colors">
              {email}
            </a>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 bg-gray-900 rounded-full flex items-center justify-center mb-4">
              <Phone className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-white mb-2">Phone</h3>
            <a href={`tel:${phone.replace(/\D/g, '')}`} className="text-gray-400 hover:text-blue-400 transition-colors">
              {phone}
            </a>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 bg-gray-900 rounded-full flex items-center justify-center mb-4">
              <MapPin className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-white mb-2">Location</h3>
            <p className="text-gray-400">{location}</p>
          </div>
        </div>
        
        <div className="flex items-center justify-center gap-4 mb-8">
          <Button
            onClick={handleEditClick}
            size="sm"
            variant="outline"
            className="gap-2 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 border-white/20 transition-all duration-300 hover:scale-110"
          >
            <Edit className="w-4 h-4" />
            Edit Contact Info
          </Button>
        </div>
        
        <div className="text-gray-500 text-sm">
          © 2026 KAIINA. All rights reserved.
        </div>
      </div>

      {/* Password Dialog */}
      <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white border-gray-800">
          <DialogHeader>
            <DialogTitle>Enter Password</DialogTitle>
            <DialogDescription className="text-gray-400">
              Please enter the password to edit contact information.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handlePasswordSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                  autoFocus
                />
                {passwordError && (
                  <p className="text-sm text-red-400">{passwordError}</p>
                )}
              </div>
            </div>
            
            <DialogFooter>
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Contact Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px] bg-gray-900 text-white border-gray-800">
          <DialogHeader>
            <DialogTitle>Edit Contact Information</DialogTitle>
            <DialogDescription className="text-gray-400">
              Update your contact details below.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSaveContact}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={tempEmail}
                  onChange={(e) => setTempEmail(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="edit-phone">Phone</Label>
                <Input
                  id="edit-phone"
                  type="tel"
                  value={tempPhone}
                  onChange={(e) => setTempPhone(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="edit-location">Location</Label>
                <Input
                  id="edit-location"
                  type="text"
                  value={tempLocation}
                  onChange={(e) => setTempLocation(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                  required
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
}
