import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Phone, Trash2 } from "lucide-react";
import MobileLayout from "@/components/MobileLayout";
import { motion } from "framer-motion";

interface Contact {
  id: number;
  name: string;
  phone: string;
  relation: string;
}

const initialContacts: Contact[] = [
  { id: 1, name: "Mom", phone: "+91 98765 43210", relation: "Mother" },
  { id: 2, name: "Dad", phone: "+91 98765 43211", relation: "Father" },
  { id: 3, name: "Sister", phone: "+91 98765 43212", relation: "Sibling" },
];

const ContactsScreen = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);

  return (
    <MobileLayout>
      <div className="px-6 pt-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
            <h1 className="text-lg font-display font-800 text-foreground">Emergency Contacts</h1>
          </div>
          <button
            onClick={() => navigate("/add-contact")}
            className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center shadow-card"
          >
            <Plus className="w-5 h-5 text-primary-foreground" />
          </button>
        </div>

        <div className="space-y-3">
          {contacts.map((contact, i) => (
            <motion.div
              key={contact.id}
              className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border shadow-card"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
                <span className="text-lg font-display font-700 text-accent-foreground">
                  {contact.name[0]}
                </span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-display font-700 text-foreground">{contact.name}</p>
                <p className="text-xs text-muted-foreground font-body">{contact.phone}</p>
                <p className="text-[10px] text-primary font-body font-600">{contact.relation}</p>
              </div>
              <div className="flex gap-2">
                <button className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center">
                  <Phone className="w-4 h-4 text-primary" />
                </button>
                <button
                  onClick={() => setContacts(contacts.filter((c) => c.id !== contact.id))}
                  className="w-9 h-9 rounded-full bg-destructive/10 flex items-center justify-center"
                >
                  <Trash2 className="w-4 h-4 text-destructive" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </MobileLayout>
  );
};

export default ContactsScreen;
